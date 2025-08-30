import { CrossIcon } from '../../../assets/icons';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({
  searchQuery,
  setSearchQuery,
  isSearchOpen,
  setIsSearchOpen,
}) => {
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);

    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  return (
    <div className='flex items-center gap-3'>
      <div
        className={`flex items-center ${isSearchOpen ? 'w-[220px] xs:w-[280px]' : 'w-auto'}`}
      >
        {isSearchOpen ? (
          <div className='relative w-[220px] xs:w-[280px]'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search...'
              className='w-[190px] xs:w-[280px] px-3 py-2 text-[14px] border border-primary rounded-lg focus:outline-none h-[35px] max-w-[250px]'
            />
            <CrossIcon
              className='absolute right-2 top-1/2 transform -translate-y-1/2 text-black cursor-pointer '
              onClick={toggleSearch}
            />
          </div>
        ) : (
          <SearchIcon
            className='text-primary cursor-pointer'
            style={{ fontSize: '28px' }}
            onClick={toggleSearch}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
