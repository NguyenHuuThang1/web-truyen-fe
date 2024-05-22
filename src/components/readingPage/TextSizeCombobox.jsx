import { useState, Fragment, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { changeSizeSetting } from '../../redux/action/readingAction';
import { useDispatch, useSelector } from 'react-redux';

const textSize = ['sm', 'base', 'xl', '2xl', '3xl', '4xl'];

export const TextSizeCombobox = () => {
  const [selectedTextSize, setSelectedTextSize] = useState(textSize[0]);
  const dispatch = useDispatch();
  const mySize = useSelector((state) => state.readingSetting.size);
  useEffect(() => {
    setSelectedTextSize(mySize);
  }, []);
  useEffect(() => {
    dispatch(changeSizeSetting({ size: selectedTextSize }));
  }, [selectedTextSize]);
  return (
    <Listbox value={selectedTextSize} onChange={setSelectedTextSize}>
      <Listbox.Button>
        <span className={`text-${selectedTextSize}`}>{selectedTextSize}</span>
      </Listbox.Button>
      <Listbox.Options className=" absolute top-[90%] bg-be dark:bg-gray-700 w-[55%] p-4 rounded-lg border-2 border-gray-600 dark:border-white">
        {textSize.map((textSize, index) => (
          /* Use the `active` state to conditionally style the active option. */
          /* Use the `selected` state to conditionally style the selected option. */
          <Listbox.Option key={index} value={textSize} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`cursor-pointer text-${textSize} ${
                  active ? ' text-yellow-500' : ''
                }`}
              >
                {textSize}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
