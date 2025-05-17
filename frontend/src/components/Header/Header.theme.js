export const headerStyles = {
    alignItems: 'center',
    justifyContent: 'space-around',
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.4) 100%)',
    position: 'fixed',
    width: '100vw',
    flexDirection: {
        base: 'column',
        sm: 'row',
    },
    gap: {
        base: '1rem',
        sm: '0'
    },
    boxShadow: '1px 40px 40px 20px rgba(0,0,0,0.4)',
    padding: '1rem 0',
    zIndex: '200',
};

export const active = {
    visibility: "visible",
    transition: "all 0.5s"
}

export const hidden = {
    visibility: "hidden",
    transition: "all 1s",
    transform: "translateY(-250%)"
}

export const logoStyles = {
    transition: 'transform 500ms ease-in-out',
    position: 'relative',
    width: { base: '115px', md: '95px', lg: '115px' },
    minWidth: { md: '95px' },
    mr: { base: 0, md: '10px', lg: '80px' },
    ml: { base: 0, md: '10px', lg: '40px' },
    _hover: {
        transform: 'scale(1.1)'
    },
};

export const accountIcon = {
    fontSize: "40px",
    _active: {
        color: "main.200",
        backgroundColor: "none"
    }
}

export const inputGroupStyles = {
    width: {
        base: '70%',
        sm: '30%',
    }
}

export const inputStyles = {
    variant: 'flushed',
    placeholder: "Search for movies, TV shows...",
    size: 'lg',
    color: 'main.100',
    fontWeight: 'bold',
    focusBorderColor: 'main.100',
    _placeholder: {
        color: 'gray.400'
    },
}

export const searchIconStyles = {
    color: 'main.100',
    cursor: 'pointer',
    transform: 'scale(1.3)'
}

export const navStyles = {
    as: 'ul',
    listStyleType: 'none',
    gap: { base: '1rem', md: '1rem', lg: '2rem' },
    fontWeight: 'bolder',
    fontSize: 'xl',
    color: 'white',
    flexWrap: 'wrap',
    justifyContent: 'center',
}

export const navLinkStyles = {
    _hover: {
        color: 'main.100',
    },
}