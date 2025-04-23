export const todaysMovieTitle = {
    textAlign: 'center',
    marginBottom: '-70px',
    color: '#fff',
    fontSize: '5xl',
    fontWeight: 'bold',
    paddingBottom: '1rem',
    textShadow: '2px 2px 50px rgba(0,0,0,0.7)',
}

export const listStyles = {
    overflowX: "scroll",
    gap: "3rem",
    padding: "2rem",
    width: "100%",
    sx: {
        "::-webkit-scrollbar": { height: "10px" },
        '::-webkit-scrollbar-track': {
            background: 'black',
            borderRadius: '10px'
        },
        "::-webkit-scrollbar-thumb": {
            background: "white",
            borderRadius: "8px"
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "gray.200"
        }
    }
}