import React from 'react'
import Select from 'react-select';
import { Controller } from 'react-hook-form';

interface Option {
  value: string | number,
  label: string | number
}

interface DropDownProps {
  label?: string,
  option: Option[],
  name: string;
  value?: Option | null
  placeholder?: string,
  onChange?: (selectedOption: Option | null) => void;
  control: any;
  error?: string
}

export const DropDown: React.FC<DropDownProps> = ({
  label,
  option,
  placeholder,
  name,
  control,
  error
}) => {

  return (
    <>

      <div className={`w-full ${error ? "border-red-700" : ""}`} >
        {label && (
          <label className={`block text-sm font-medium  ${error ? "text-red-700" : "text-gray-700"} mb-1`}>
            {label}*
          </label>
        )}

        <div className={`w-full rounded-lg`}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  options={option}
                  className={error ? "react-select-error" : ""}
                  classNamePrefix="react-select"
                  placeholder={placeholder}
                />
              </>
            )}
          />
          {error && <p className='text-red-600 text-sm mt-1'>{error}</p>}
        </div>
      </div>

    </>
  )
}
