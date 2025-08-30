import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomInput,
  CustomButton,
  SelectDropdown,
} from '../../../../../components/Shared';
import { isEmpty } from '../../../../../utils/utils';
import {
  createActorAudition,
  updateActorAudition,
} from '../../../../../redux/features/actorAuditions/actorAuditionsSlice';
import { useSnackbar } from '../../../../../hooks/useSnackbar';

export const AddActorAudition = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const restProps = location.state;
  const { toast } = useSnackbar();
  const { loading } = useSelector((state) => state?.actorAuditions);

  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
    description: '',
    status: 'open',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (restProps?.row) {
      setFormData({
        id: restProps?.row?.id || '',
        title: restProps?.row?.title || '',
        purpose: restProps?.row?.purpose || '',
        description: restProps?.row?.description || '',
        status: restProps?.row?.status || 'open',
      });
    }
  }, [restProps?.row]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'status') {
      setFormData((prev) => ({
        ...prev,
        status: value?.value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      purpose: formData.purpose,
      description: formData.description,
      status: formData.status,
    };

    let action;
    if (restProps?.row?.id) {
      action = dispatch(
        updateActorAudition({ id: formData.id, values: payload })
      );
    } else {
      action = dispatch(createActorAudition(payload));
    }

    const data = await action;

    if (data.meta.requestStatus === 'fulfilled') {
      setFormData({
        id: '',
        title: '',
        purpose: '',
        description: '',
        status: 'open',
      });
      setErrors({});
      navigate('/auditions');
    } else if (data.meta.requestStatus === 'rejected') {
      toast.error(
        typeof data?.payload === 'string' ? data.payload : 'An error occurred'
      );
    }
  };

  const auditionStatus = [
    { label: 'Open', value: 'open' },
    { label: 'Closed', value: 'closed' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className='mx-5 sm:mx-5 h-full py-5'>
      <h2 className='text-lg md:text-xl font-semibold tracking-tight text-gray-900 mb-6'>
        {restProps?.row ? 'Edit Audition' : 'Add Audition'}
      </h2>

      <form onSubmit={handleSubmit} className='h-[calc(100vh-170px)]'>
        <div className='flex flex-col h-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <CustomInput
              label='Project Title'
              name='title'
              type='text'
              autoFocus
              value={formData.title}
              onChange={handleChange}
              placeholder='Enter project title'
              error={!!errors.title}
              errorMsg={errors.title}
              required
            />
            <CustomInput
              label='Purpose'
              name='purpose'
              type='text'
              value={formData.purpose}
              onChange={handleChange}
              placeholder='Enter purpose'
              error={!!-errors.purpose}
              errorMsg={errors.purpose}
              required
            />
            <CustomInput
              label='Description'
              name='description'
              type='text'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter description'
              error={!!errors.description}
              errorMsg={errors.description}
              required
            />
            <SelectDropdown
              label='Status'
              name='status'
              value={
                auditionStatus.find(
                  (option) => option.value === formData.status
                ) || null
              }
              onChange={handleChange}
              options={auditionStatus}
              placeholder='Select status'
              error={!!errors.status}
              errorMsg={errors.status}
              required
            />
          </div>

          <div className='flex flex-col-reverse xs:flex-row sm:gap-1 gap-3 justify-end mt-auto'>
            <CustomButton
              variant='outlined'
              className='w-full sm:w-fit'
              onClick={() => navigate('/auditions')}
              type='button'
            >
              Cancel
            </CustomButton>
            <CustomButton
              type='submit'
              className='w-full sm:w-fit'
              disabled={loading || isEmpty(formData)}
              loading={loading}
            >
              {restProps?.row ? 'Update Audition' : 'Add Audition'}
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};
