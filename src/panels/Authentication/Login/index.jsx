import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Local Imports
import { CustomButton, CustomInput, Logo } from '../../../components/Shared';
import { AuthLayout } from '../../../components/Auth/AuthLayout';
import { isEmpty, isError, validateEmail } from '../../../utils/utils';
import { loginUser } from '../../../redux/features/auth/authSlice';
import { useSnackbar } from '../../../hooks/useSnackbar';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useSnackbar();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (isEmpty(formData)) {
      return;
    }

    if (!validateEmail(formData?.email)) {
      newErrors.email = 'Invalid Email';
    }

    if (isError(newErrors)) {
      setErrors(newErrors);
      return;
    }

    const loginPayload = {
      email: formData?.email?.trim()?.toLowerCase(),
      password: formData?.password,
      is_admin: false,
    };

    try {
      setLoading(true);
      const result = await dispatch(loginUser(loginPayload));

      if (result?.meta?.requestStatus === 'fulfilled') {
        setLoading(false);
        setFormData({
          email: '',
          password: '',
        });

        navigate('/dashboard');
      } else {
        setLoading(false);
        toast.error(result?.payload);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Login failed:', err);
    }
  };

  return (
    <AuthLayout title="Welcome back!">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <Logo showText={false} />
        <h2 className="mt-3 lg:mt-6 text-2xl font-semibold tracking-tight text-gray-900 max-lg:text-center">Sign in to your account</h2>

        <div className="mt-8">
          <form
            onSubmit={handleSubmit}
          >

            <div className="space-y-8">
              <CustomInput
                label="Email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                autoComplete="on"
                autoFocus
                placeholder="Enter your email"
                error={!!errors.email}
                errorMsg={errors.email}
              />

              <CustomInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                error={!!errors.password}
                errorMsg={errors.password}
              />
            </div>

            <div className="text-end">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-primary cursor-pointer hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* <div className="flex items-center mt-6 cursor-pointer">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                checked={formData.rememberMe || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rememberMe: e.target.checked,
                  }))
                }
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                Remember me
              </label>
            </div> */}

            <div className="flex flex-col gap-2 w-full mt-8">
              <CustomButton
                disabled={isEmpty(formData)}
                type="submit"
                loading={loading}
                sx={{
                  width:'100%'
                }}
              >
                Log in
              </CustomButton>

              <p className="text-sm text-center">
                Don’t have an account?{' '}
                <button
                  type="submit"
                  className="text-primary cursor-pointer font-medium hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/signup')
                  }}
                >
                  Sign up
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
