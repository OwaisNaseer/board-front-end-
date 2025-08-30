import { useState, useEffect, useCallback, useRef } from 'react';
import { CircularProgress, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../../../redux/features/actorBookings/actorBookingsSlice';
import { useSnackbar } from '../../../hooks/useSnackbar';
import {
  CustomTable,
  SelectDropdown,
  TabPanel,
  DatePicker,
  CustomInput,
} from '../../../components/Shared';
import {
  StockDataColumnData,
  StockDataColumnExtensionsData,
} from '../../../components/shared/CustomTable/dummyData';
import { a11yProps } from '../../../utils/utils';
import dayjs from 'dayjs';

export const MarketData = () => {
  const dispatch = useDispatch();
  const { toast } = useSnackbar();
  const { bookings, loading, error } = useSelector(
    (state) => state.actorBookings
  );
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    symbol: '',
    cancelInterval: '',
    selectDate: '',
    endDate: '',
  });
  const prevFormData = useRef(formData); // Track previous formData to avoid duplicate calls

  const cancelIntervals = [
    // { label: '1s', value: '1s' },
    { label: '1m', value: '1m' },
    { label: '3m', value: '3m' },
    { label: '5m', value: '5m' },
    { label: '15m', value: '15m' },
    { label: '30m', value: '30m' },
    { label: '1h', value: '1h' },
    { label: '2h', value: '2h' },
    { label: '4h', value: '4h' },
    { label: '6h', value: '6h' },
    { label: '8h', value: '8h' },
    { label: '12h', value: '12h' },
    { label: '1d', value: '1d' },
    { label: '3d', value: '3d' },
    { label: '1w', value: '1w' },
    { label: '1M', value: '1M' },
  ];

  // Debounce function to limit API calls
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Fetch market data with debouncing
  const fetchMarketData = useCallback(
    debounce((formData) => {
      if (
        formData.symbol &&
        formData.cancelInterval &&
        formData.selectDate &&
        (formData.symbol !== prevFormData.current.symbol ||
          formData.cancelInterval !== prevFormData.current.cancelInterval ||
          formData.selectDate !== prevFormData.current.selectDate ||
          formData.endDate !== prevFormData.current.endDate)
      ) {
        dispatch(
          getBookings({
            symbol: formData.symbol,
            interval: formData.cancelInterval,
            date: formData.selectDate,
            end_date: formData.endDate || undefined,
          })
        )
          .unwrap()
          .catch((err) => {
            console.log(err)
            toast.error(
              err ||
                'Failed to fetch market data. Please check the symbol or try again.',
              {
                position: 'top-right',
                autoClose: 5000,
              }
            );
          });
        prevFormData.current = formData;
      }
    }, 500),
    [dispatch, toast]
  );

  useEffect(() => {
    fetchMarketData(formData);
  }, [formData, fetchMarketData]);

  const handleChange = (event, newValue) => setValue(newValue);

  const handleChangea = (e) => {
    const { name, value } = e.target;
    if (name === 'symbol') {
      setFormData({
        symbol: value,
        cancelInterval: '',
        selectDate: '',
        endDate: '',
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDateTimeChange = (name, value) => {
    const newValue = value ? value.toISOString() : '';
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const dataProviders = [
    {
      columnName: ['change'],
      func: (restProps) => (
        <p
          className={
            restProps.row.change.includes('+')
              ? 'text-green-500'
              : restProps.row.change.includes('-')
              ? 'text-red-500'
              : ''
          }
        >
          {restProps.row.change}
        </p>
      ),
    },
  ];

  return (
    <div className="bg-white">
      <div className="min-h-[65px] flex items-center justify-between px-4">
        <div className="flex items-center h-[49px] pr-8">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              borderBottom: 'none',
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            <Tab
              label="Real-time data"
              {...a11yProps(0)}
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'none',
                color: '#4B5563',
                padding: '8px 16px',
                '&.Mui-selected': {
                  color: '#2563EB',
                  fontWeight: 700,
                  backgroundColor: '#EFF6FF',
                  borderRadius: '8px',
                },
                '&:hover': {
                  color: '#2563EB',
                  backgroundColor: '#F3F4F6',
                  borderRadius: '8px',
                },
              }}
            />
            <Tab
              label="Historical data"
              {...a11yProps(1)}
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'none',
                color: '#4B5563',
                padding: '8px 16px',
                '&.Mui-selected': {
                  color: '#2563EB',
                  fontWeight: 700,
                  backgroundColor: '#EFF6FF',
                  borderRadius: '8px',
                },
                '&:hover': {
                  color: '#2563EB',
                  backgroundColor: '#F3F4F6',
                  borderRadius: '8px',
                },
              }}
            />
          </Tabs>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <div className="mt-4 px-2 sm:px-5">
          <div className="h-[calc(100vh-160px)] overflow-auto">
            <p className="text-gray-700">Real-time data not available in this mode</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="mt-4 px-2 sm:px-5">
          <div>
            {loading ? (
              <div className="flex justify-center items-center h-[80vh]">
                <CircularProgress size={40} className="!text-blue-600" />
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex-1 min-w-[200px]">
                    <CustomInput
                      label="Symbol"
                      name="symbol"
                      value={formData.symbol}
                      onChange={handleChangea}
                      placeholder="Enter Symbol (e.g., LTCUSDT)"
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <DatePicker
                      label="Start Date"
                      name="selectDate"
                      value={formData.selectDate ? dayjs(formData.selectDate) : null}
                      onChange={(value) => handleDateTimeChange('selectDate', value)}
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <DatePicker
                      label="End Date (Optional)"
                      name="endDate"
                      value={formData.endDate ? dayjs(formData.endDate) : null}
                      onChange={(value) => handleDateTimeChange('endDate', value)}
                    />
                  </div>
                </div>
                {formData.symbol && formData.selectDate && (
                  <div className="mt-4">
                    <p className="font-bold text-gray-800 mb-2">Select Interval</p>
                    <div className="flex flex-wrap gap-2">
                      {cancelIntervals.map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleChangea({ target: { name: 'cancelInterval', value: option.value } })
                          }
                          className={`rounded-full cursor-pointer px-4 py-2 text-sm font-medium ${
                            formData.cancelInterval === option.value
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100/50 text-blue-600 hover:bg-blue-100'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {bookings.length > 0 ? (
                  <div className="h-[calc(100vh-305px)] overflow-auto">
                    <CustomTable
                      rows={bookings}
                      columns={StockDataColumnData}
                      tableColumnExtensions={StockDataColumnExtensionsData}
                      dataProviders={dataProviders}
                      metaData={{ totalCount: bookings.length }}
                      noCheckbox
                    />
                  </div>
                ) : (
                  <div className="mt-5 h-[calc(100vh-160px)] flex justify-center items-center text-gray-700">
                    Please enter a symbol, select an interval, and choose a date to view market data.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </TabPanel>
    </div>
  );
};