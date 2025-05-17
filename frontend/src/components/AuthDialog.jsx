import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Tabs,
    TabList,
    Tab,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Text,
    IconButton,
    VStack,
    Box,
    useToast,
    FormControl,
    FormLabel,
    FormErrorMessage
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { FaEye, FaEyeSlash, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { login, register } from "../services/auth"
import { AuthContext } from "../context/AuthContext";

const AuthDialog = ({ isOpen, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { setIsLoggedIn, setUser } = useContext(AuthContext);

    const toast = useToast();

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
    });

    const [touched, setTouched] = useState({
        username: false,
        password: false,
        confirmPassword: false,
        name: false,
    });

    const markTouched = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    useEffect(() => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setErrors({ username: '', password: '', confirmPassword: '', name: '' });
        setShowPassword(false);
        setShowConfirmPassword(false);
    }, [tabIndex, isOpen]);

    const validateField = (fieldName) => {
        let error = '';

        switch (fieldName) {
            case 'username':
                if (!username.trim()) error = 'Username is required';
                break;

            case 'password':
                if (!password) {
                    error = 'Password is required';
                } else if (password.length < 6) {
                    error = 'Password must be at least 6 characters';
                }
                break;

            case 'confirmPassword':
                if (tabIndex === 1) {
                    if (!confirmPassword) {
                        error = 'Please confirm your password';
                    } else if (confirmPassword !== password) {
                        error = 'Passwords do not match';
                    }
                }
                break;

            case 'name':
                if (tabIndex === 1 && !name.trim()) {
                    error = 'Name is required';
                }
                break;

            default:
                break;
        }

        setErrors(prev => ({ ...prev, [fieldName]: error }));
        return error === '';
    };

    const validateAllFields = () => {
        const fieldsToValidate = tabIndex === 0
            ? ['username', 'password']
            : ['username', 'password', 'confirmPassword', 'name'];

        const results = fieldsToValidate.map(field => validateField(field));
        return results.every(Boolean);
    };

    const isConfirmDisabled = () => {
        if (tabIndex === 0) {
            return !username.trim() || !password || errors.username || errors.password;
        }
        return !username.trim() || !password || !confirmPassword || !name.trim() ||
            errors.username || errors.password || errors.confirmPassword || errors.name;
    };

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleLogin = async () => {
        if (!validateAllFields()) return;

        const { success, error, user } = await login(username, password);

        if (success) {
            setIsLoggedIn(true);
            setUser(user);
            toast({ title: "Signed in successfully", status: "success", duration: 4000 });
            onClose();
        } else {
            toast({
                title: "Sign in failed",
                description: error || "Unknown error",
                status: "error",
                duration: 4000,
                isClosable: false
            });
        }
    };

    const handleRegister = async () => {
        if (!validateAllFields()) return;

        const { success, error, user } = await register(username, password, name);

        if (success) {
            setIsLoggedIn(true);
            setUser(user);
            toast({ title: "Signed up and signed in successfully", status: "success", duration: 4000 });
            onClose();
        } else {
            toast({
                title: "Sign up failed",
                description: error,
                status: "error",
                duration: 4000,
                isClosable: false
            });
        }
    };

    const handleConfirm = () => {
        if (tabIndex === 0) {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
            <ModalOverlay
                bg="blackAlpha.600"
                backdropFilter="blur(10px)" />
            <ModalContent maxW="600px" p={6}>
                <ModalHeader fontWeight="bold" mb={3}>
                    {tabIndex === 0 ? (
                        <Box display="flex" alignItems="center" gap={3} fontSize="3xl">
                            <FaSignInAlt /> Sign In
                        </Box>
                    ) : (
                        <Box display="flex" alignItems="center" gap={3} fontSize="3xl">
                            <FaUserPlus /> Sign Up
                        </Box>
                    )}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs index={tabIndex} onChange={setTabIndex} variant="enclosed" isFitted size="lg" mb={4}>
                        <TabList>
                            <Tab>Sign In</Tab>
                            <Tab>Sign Up</Tab>
                        </TabList>
                    </Tabs>

                    <Text fontSize="lg" color="gray.600" p="20px 0">
                        {tabIndex === 0
                            ? "Welcome back! Please enter your credentials."
                            : "Create an account to get started."}
                    </Text>

                    <VStack spacing={6} as="form" onSubmit={e => e.preventDefault()}>
                        {tabIndex === 1 && (
                            <FormControl isInvalid={!!errors.name && touched.name} isRequired>
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    placeholder="Your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onBlur={() => {
                                        markTouched('name');
                                        validateField('name');
                                    }} />
                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                        <FormControl isInvalid={!!errors.username && touched.username} isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                placeholder="Username"
                                value={username}
                                onChange={handleUsernameChange}
                                onBlur={() => {
                                    markTouched('username');
                                    validateField('username');
                                }}
                                autoComplete="username"
                            />
                            <FormErrorMessage>{errors.username}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.password && touched.password} isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onBlur={() => {
                                        markTouched('password');
                                        validateField('password');
                                    }}
                                    autoComplete={tabIndex === 0 ? "current-password" : "new-password"}
                                    onCopy={(e) => e.preventDefault()}
                                    onCut={(e) => e.preventDefault()}
                                />
                                <InputRightElement>
                                    <IconButton
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                        onClick={togglePassword}
                                        size="sm"
                                        variant="ghost"
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>

                        {tabIndex === 1 && (
                            <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword} isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        placeholder="Confirm Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        onBlur={() => {
                                            markTouched('confirmPassword');
                                            validateField('confirmPassword');
                                        }}
                                        autoComplete="new-password"
                                        onPaste={(e) => e.preventDefault()}
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                            icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            onClick={toggleConfirmPassword}
                                            size="sm"
                                            variant="ghost"
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                            </FormControl>
                        )}
                    </VStack>
                </ModalBody>

                <ModalFooter justifyContent="space-between" mt={5}>
                    <Button variant="outline" size="lg" onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        size="lg"
                        bg="main.100"
                        color="white"
                        _hover={{ bg: "main.200" }}
                        onClick={handleConfirm}
                        isDisabled={isConfirmDisabled()}
                    >
                        {tabIndex === 0 ? "Sign In" : "Sign Up"}
                    </Button>
                </ModalFooter>

            </ModalContent>
        </Modal >
    );
};

export default AuthDialog;