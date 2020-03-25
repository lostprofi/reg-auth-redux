const initialState = {
  users: [],
  userAuthFlag: false,
  isRegFormValid: false,
  formControls: {
    regFormControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Enter your mail',
        errorMessage: 'Enter correct email',
        valid: {
          isValid: false,
          errorMessage: '',
        },
        touched: false,
        validation: {
          required: true,
          email: true,
          unique: true,
        },
      },

      name: {
        value: '',
        type: 'text',
        label: 'Name',
        errorMessage: 'Enter correct username',
        valid: {
          isValid: false,
          errorMessage: '',
        },
        touched: false,
        validation: {
          required: true,
          minLength: 3,
        },
      },
    },
    authFormControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Enter your mail',
        errorMessage: 'Enter correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
          exist: true,
        },
      },
    },
  },
  initFormControls: {
    regFormControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Please enter your mail',
        errorMessage: 'Enter correct email',
        valid: {
          isValid: false,
          errorMessage: '',
        },
        touched: false,
        validation: {
          required: true,
          email: true,
          unique: true,
        },
      },

      name: {
        value: '',
        type: 'text',
        label: 'Name',
        errorMessage: 'Enter correct username',
        valid: {
          isValid: false,
          errorMessage: '',
        },
        touched: false,
        validation: {
          required: true,
          minLength: 3,
        },
      },
    },
    authFormControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Please enter your mail',
        errorMessage: 'Enter correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
          exist: true,
        },
      },
    },
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER': {
      const usersCopy = state.users;

      usersCopy.unshift(action.payload);

      if (usersCopy.length > 10) {
        usersCopy.pop();
      }

      return { ...state, users: usersCopy };
    }

    case 'AUTH_MAIL': {
      return { ...state, authMail: action.payload };
    }

    case 'AUTH_USER': {
      return { ...state, userAuthFlag: action.payload };
    }

    case 'AUTH_FORM-CONTROL': {
      const formControls = { ...state.formControls };
      formControls.authFormControls.email = action.payload;

      return { ...state, formControls };
    }

    case 'REG_FORM-CONTROL': {
      const formControls = { ...state.formControls };
      formControls.regFormControls = action.payload;

      return { ...state, formControls };
    }

    case 'IS_REG-FORM_VALID': {
      return { ...state, isRegFormValid: action.payload };
    }

    default:
      return state;
  }
};

export default userReducer;
