import { useState, Fragment, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFontSetting } from '../../redux/action/readingAction';

const font = ['patrick', 'playfair', 'sans', 'mono', 'protes', 'roboto'];

export const FontCombobox = () => {
  const dispatch = useDispatch();
  const myFont = useSelector((state) => state.readingSetting.font);
  const [selectedFont, setSelectedFont] = useState(font[0]);
  useEffect(() => {
    setSelectedFont(myFont);
  }, []);
  useEffect(() => {
    dispatch(changeFontSetting({ font: selectedFont }));
  }, [selectedFont]);
  return (
    <Listbox value={selectedFont} onChange={setSelectedFont}>
      <Listbox.Button>
        <span className={`w-full font-${selectedFont}`}>{selectedFont}</span>
      </Listbox.Button>
      <Listbox.Options className="absolute top-[60%] bg-be dark:bg-gray-700 w-[55%] p-4 rounded-lg border-2 border-gray-600 dark:border-white">
        {font.map((font, index) => (
          /* Use the `active` state to conditionally style the active option. */
          /* Use the `selected` state to conditionally style the selected option. */
          <Listbox.Option key={index} value={font} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`cursor-pointer font-${font} ${active ? ' text-yellow-500' : ''}`}
              >
                {font}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
