export const todaysMovieTitle = {
    textAlign: 'center',
    color: '#fff',
    fontSize: '5xl',
    fontWeight: 'bold',
    paddingBottom: '1rem',
    textShadow: '2px 2px 50px rgba(0,0,0,0.7)',
}

export const card = {
    direction:{ 
        base: 'column',
        md: 'row' 
    },
    boxShadow: '1px 1px 40px -5px rgba(0,0,0,0.75)',
    position:'relative',
    overflow:'hidden',
}

export const cardImage = {
    objectFit: 'cover',
    maxWidth: {
        base: '100%',
        md: '60%',
        lg: '70%',
    },
}

export const cardContentContainer = {
    backgroundColor: 'secondary.100',
    color: '#fff',
}

export const cardTitle = {
    size: 'lg',
    fontWeight: 'bold',
    marginBottom: '20px'
}

export const cardText = {
    paddingY: '2',
    fontSize: {
        base: 'md',
        sm: 'xl'
    },
    marginBottom: '20px'
}

export const cardRating = {
    position: 'absolute',
    bottom: '0',
    right: '0',
    fontWeight: 'black',
    fontSize: '2xl',
    backgroundColor: 'main.100',
    width: '5rem',
    height: '5rem',
    padding: '1.5rem 0 0 1.5rem',
    borderRadius: '50px 0 0 0',
}


export const buttonStyles = {
    borderRadius: '5px',
    border: '0',
    position: "relative",
    backgroundColor: 'main.100',
    overflow: "hidden",
    boxShadow:  '1px 1px 50px -11px rgba(0,0,0,0.75)',
    _before: {
        position: "absolute",
        content: `""`,
        width: "100%",
        height: "100%",
        backgroundColor: 'main.200',
        transition: 'transform 500ms ease-in-out',
        transform: 'scaleX(0)',
        transformOrigin: 'center',
    },
    _hover: {
        _before: { transform: 'scaleX(1)' }
    }
}