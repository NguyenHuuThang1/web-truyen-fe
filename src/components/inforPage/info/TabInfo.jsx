import React, { useEffect } from 'react';
import { TranslatorInfo } from './TranslatorInfo';

export const TabInfo = (props) => {
  return (
    <div className="grid w-full grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-8">
        {props.desc ? (
          <article
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(props.desc)
                .replace(/\\r\\n/g, '<br>')
                .slice(
                  1,
                  JSON.stringify(props.desc).replace(/\\r\\n/g, '<br>').length -
                    1
                ),
            }}
          ></article>
        ) : (
          ''
        )}
      </div>
      <div className="col-span-12 md:col-span-4">
        <TranslatorInfo translator={props.translator} />
      </div>
    </div>
  );
};
