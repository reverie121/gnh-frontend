import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: "#4B0082",
            light: "#663399",
            dark: "#1F0954",
            contrastText: '#fff'
        },
        secondary: {
            main: "#48D1CC",
            light: "#00FFFF",
            dark: "#00A0A0",
            contrastText: '#1F0954'
        }
    }, 
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "secondary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                        backgroundColor: "secondary.light",
                        color: "secondary.contrastText",
                    }                            
                }
            }
        }
    },
    typography: {
        fontFamily: [
            'Chivo Mono', 'monospace'
        ].join(',')
    }        
})

export default theme;