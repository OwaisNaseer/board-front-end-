// Library imports
import Modal from "@mui/material/Modal";

// Icons Import
import CloseIcon from "@mui/icons-material/Close";

// Local Imports
import { CustomButton } from "../CustomButton";
import { colors } from "../../../theme/globalVeriable";

export const CustomModal = ({
  children,
  open,
  close,
  title,
  isDelete,
  primaryButton,
  primaryButtonText,
  handleSave,
  disableSave,
  loading,
  saveButtonSx,
  saveButton,
  minWidth,
  maxWidth,
}) => {
  return (
   <div>
  <Modal open={open} onClose={close}>
    {/* Main container */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-lg pt-2.5 px-5 pb-2.5">
      {/* Modal Header */}
      <div className="flex justify-between items-center">
        <p className="text-[18px] text-gray-600">{title}</p>
        <div className="ml-auto cursor-pointer" onClick={close}>
          <CloseIcon />
        </div>
      </div>

      {/* Modal Children */}
      <div
        className={`overflow-auto ${
          minWidth || maxWidth
            ? ''
            : 'max-w-[265px] xs:max-w-[370px] sm:max-w-[450px] md:max-w-[600px] min-w-[265px] xs:min-w-[370px] sm:min-w-[450px] md:min-w-[600px]'
        } min-h-[70px]`}
        style={{ minWidth: minWidth, maxWidth: maxWidth }}
      >
        {children}
      </div>

      {/* Modal Footer */}
      <div className="flex flex-col-reverse xs:flex-row justify-end items-center gap-2">
         <CustomButton
              sx={{ width: { xxs: "100%", xs: "fit-content" } }}
              onClick={close}
              variant={"outlined"}
            >
              <p fontSize={"14px"}>Cancel</p>
            </CustomButton>

        {saveButton === null ? (
          ''
        ) : (
          <CustomButton
            type="button"
            varient="outline"
         sx={{
                  width: { xxs: "100%", xs: "fit-content" },
                  bgcolor: isDelete ? colors.danger : "primary.main",
                  display: primaryButton === false ? "none" : "block",
                  boxShadow: "none",
                  ...saveButtonSx,
                }}
            onClick={handleSave}
            disabled={disableSave}
            loading={loading}
            style={saveButtonSx}
          >
            <p className="leading-[16px] text-[14px]">
             {isDelete
                    ? primaryButtonText
                      ? primaryButtonText
                      : "Delete"
                    : primaryButtonText
                    ? primaryButtonText
                    : "Save"}
            </p>
          </CustomButton>
        )}
      </div>
    </div>
  </Modal>
</div>

  );
};