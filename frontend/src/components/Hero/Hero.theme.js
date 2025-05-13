export const heroContainer = {
  width: '100wh',
  height: '130vh',
  backgroundPosition: 'center center',
}

export const heroTitleContainer = {
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '3rem',
  margin: {
    base: '1rem',
    sm: '3rem',
  },
  alignItems: 'flex-start',
}

export const heroTitle = {
  as: 'h1',
  fontSize: {
    base: '3xl',
    sm: '4xl',
    md: '5xl',
    lg: '6xl'
  },
  color: '#fff',
  lineHeight: '0.9',
  fontWeight: 'bold',
  maxWidth: {
    base: '320px',
    sm: '440px',
    md: '560px',
  },
}

export const buttonStyles = {
  borderRadius: '5px',
  border: '0',
  position: "relative",
  backgroundColor: 'main.100',
  color: '#fff',
  overflow: "hidden",
  boxShadow: '1px 1px 50px -11px rgba(0,0,0,0.75)',
  _before: {
    position: "absolute",
    content: `""`,
    width: "100%",
    height: "100%",
    backgroundColor: 'secondary.100',
    transition: 'transform 500ms ease-in-out',
    transform: 'scaleX(0)',
    transformOrigin: 'center',
  },
  _hover: {
    _before: { transform: 'scaleX(1)' }
  }
}