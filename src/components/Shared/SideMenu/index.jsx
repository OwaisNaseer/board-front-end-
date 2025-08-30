import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sideMenuRoutes } from '../../../routes/sideMenuConfig';
import { useOnClickOutside } from '../../../utils/utils';
import { ArrowHeadIcon, CloseMenuIcon, MenuIcon } from '../../../assets/icons';
import { logo } from '../../../assets/images';
import { useSelector } from 'react-redux';
import { useStoreData } from '../../../hooks/useStoreData';

const SideMenu = ({ sideMenuOpen, setSideMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const popoverRef = useRef(null);
  const currentPath = location.pathname;
  const { role } = useStoreData();

  const [openPopover, setOpenPopover] = useState(false);

  const [childRoute, setChildRoute] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setSideMenuOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useOnClickOutside(popoverRef, () => setOpenPopover(false));

  return (
    <div
      className={`h-full absolute left-0 z-50 sm:relative flex flex-col select-none bg-white justify-between transition-all duration-300 ${
        sideMenuOpen ? 'w-[250px]' : 'w-[65px]'
      }`}
    >
      <div className='flex items-center justify-between border-r border-b border-cool-grey-200 px-[11px] h-[79px]'>
        <div className='flex items-center gap-3 overflow-hidden'>
          {sideMenuOpen && (
            <div className='w-full flex items-center justify-center gap-2 h-10'>
              <span className='text-[16px] font-semibold text-black whitespace-nowrap'>
                Board
              </span>
            </div>
          )}
        </div>
        <div
          className='text-black text-sm font-bold cursor-pointer'
          onClick={() => setSideMenuOpen(!sideMenuOpen)}
        >
          <div className='pr-2'>
            {sideMenuOpen ? <CloseMenuIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto flex pt-5 flex-col transition-all duration-300 gap-3 border-r border-cool-grey-200'>
        {sideMenuRoutes(role)?.map((route, index) => {
          const isMainActive = currentPath.startsWith(route.path);
          const isChild = Array.isArray(route.child) && route.child.length > 0;
          const isExpanded = childRoute === route.path;

          return (
            <div key={index}>
              <div
                onClick={() => {
                  if (isChild) {
                    setChildRoute((prev) =>
                      prev === route.path ? null : route.path
                    );
                  } else {
                    navigate(route.path);
                  }
                }}
                className={`flex items-center justify-between mx-2 rounded px-3 py-2 cursor-pointer text-sm font-medium transition-all duration-300 ${
                  isMainActive
                    ? 'bg-blue-400/20 text-blue-700'
                    : 'hover:bg-gray-100 text-black'
                }`}
              >
                <div className='flex items-center gap-2'>
                  <div className='min-w-[20px]'>{route.icon}</div>
                  {sideMenuOpen && (
                    <span className='truncate'>{route.text}</span>
                  )}
                </div>

                {isChild && sideMenuOpen && (
                  <span
                    className={`transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    <ArrowHeadIcon width={12} height={12} />
                  </span>
                )}
              </div>

              <div
                className={`transition-[max-height] duration-300 overflow-hidden ${
                  isExpanded ? 'max-h-[999px]' : 'max-h-0'
                }`}
              >
                {isChild && (
                  <div
                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                      isExpanded ? 'max-h-[500px]' : 'max-h-0'
                    }`}
                  >
                    <div
                      className={`flex flex-col gap-1 ${
                        sideMenuOpen ? 'pl-5' : 'pl-1.5'
                      } pt-2`}
                    >
                      {route.child.map((child, childIndex) => {
                        const isChildActive = currentPath === child.path;
                        return (
                          <div
                            key={childIndex}
                            onClick={() => navigate(child.path)}
                            className={`flex items-center mx-2 gap-2 px-2 py-1 rounded text-sm font-medium cursor-pointer transition ${
                              isChildActive
                                ? 'bg-blue-400/20 text-blue-700'
                                : 'hover:bg-gray-100 text-black/80'
                            }`}
                          >
                            <span
                              className={`${
                                !sideMenuOpen && 'w-full'
                              } text-[10px] text-center`}
                            >
                              {child?.childIcon}
                            </span>
                            {sideMenuOpen && (
                              <span className='truncate'>
                                {child.moduleName}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className='mt-auto flex flex-col gap-1'></div>
    </div>
  );
};

export default SideMenu;
