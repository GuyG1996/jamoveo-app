const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    padding: '0 20px',
  },
  logo: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '150px',
    height: '150px',
    backgroundColor: 'transparent',
  },
  content: {
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '600px',
  },
  title: {
    fontSize: '3rem',
    color: '#333',
    margin: '0 0 20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'flex-start',
  },
  input: {
    width: '50%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  passwordContainer: {
    position: 'relative',
    width: '50%',
  },
  passwordInput: {
    width: '100%',
    padding: '10px',
    paddingRight: '10px', 
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  eyeButton: {
    position: 'absolute',
    right: '-45px',
    top: '25%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    color: '#333', // Icon color
    fontSize: '1rem', // Small icon size
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default styles;
