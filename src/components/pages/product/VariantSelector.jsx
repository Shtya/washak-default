import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion


export const VariantSelector = ({
  cn,
  innerCn,
  labelCn,
  variants = [],
  getValues,
  isVariantSelected = [],
  setNewOption,
  showValidation,
  setShowValidation,
  defaultVariantCombinations = [], // e.g. [1549,1552]
  showVariantDetails = true,
  dataAos = ''
}) => {
  const [openSelectId, setOpenSelectId] = useState(null);
  const [touchedVariants, setTouchedVariants] = useState({});
  const defaultSet = new Set(defaultVariantCombinations);


  // set defaults (either from defaultVariantCombinations or first option)
  useEffect(() => {
    if (!variants?.length) return;

    variants.forEach(variant => {
      const validOptions = variant.options || [];
      if (validOptions.length === 0) return;

      // If already selected for this variant, skip
      const alreadySelected = isVariantSelected(variant)
      if (alreadySelected) return;

      // Try to find a default match
      const matched = validOptions.find(opt => defaultSet.has(opt.id));
      const selected = matched || validOptions[0];


      if (selected) {
        handleVariantSelect(variant.id, selected.id, false);
      }
    });
  }, [variants, defaultVariantCombinations]);

  const handleVariantSelect = (variantId, optionId, userAction = true) => {
    if (optionId !== null && optionId !== undefined && optionId !== '') {
      setNewOption(variantId, optionId);
    }

    setShowValidation(false);

    if (userAction) {
      setTouchedVariants(prev => ({ ...prev, [variantId]: true }));
    }
  };


  const CustomSelect = ({ variant }) => {
    const currentOptions = getValues() || [];
    const selectedOption = currentOptions.find(opt => opt.startsWith(`${variant.id}_`));
    const selectedOptionId = selectedOption ? selectedOption.split('_')[1] : null;
    const selectedOptionName = variant.options.find(opt => opt.id == selectedOptionId)?.variant_option_name;

    return (
      <div className='relative max-w-[200px] w-full '>
        <button
          type='button'
          className={`w-full h-[36px] md:h-[38px] px-[9px] md:px-2.5 text-sm border-[1px] rounded-lg flex justify-between items-center transition-all duration-200 
          ${selectedOptionId ? 'border-[#0B649F1A]  text-white ' : 'border-[#EFF2F4] text-[#637381] hover:bg-[#0B649F1A] '}
           
          ${touchedVariants[variant.id] ? 'ring-2 ring-indigo-100' : ''}`}
          style={{ backgroundColor: 'var(--option_selected_color, var(--main))' }}
          onClick={() => setOpenSelectId(openSelectId === variant.id ? null : variant.id)}>
          <span className='truncate font-medium'>{selectedOptionName || `إختار ${variant.variant_name}`}</span>

          {/* Rotate arrow with ease */}
          <motion.div className={`text-white`} initial={{ rotate: 0 }} animate={{ rotate: openSelectId === variant.id ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
            <ChevronDown size={18} />
          </motion.div>
        </button>

        {/* Fade-in and slide-up animation for dropdown */}
        <motion.div
          className={`absolute z-[100] mt-1 text-sm w-full bg-white border-[1px] border-gray-100 rounded-lg max-h-60 overflow-y-auto`}
          initial={{ opacity: 0, y: 20, pointerEvents: 'none' }}
          animate={{
            opacity: openSelectId === variant.id ? 1 : 0,
            y: openSelectId === variant.id ? 0 : 20,
            pointerEvents: openSelectId === variant.id ? 'auto' : 'none', // Disable pointer events when closed
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}>
          {variant.options.map(option => {
            const isSelected = currentOptions.includes(`${variant.id}_${option.id}`);
            return (
              <div
                key={option.id}
                className={`h-[36px] md:h-[38px] px-[9px] md:px-2.5 cursor-pointer transition-colors duration-150 flex items-center ${isSelected ? 'bg-[#0B649F1A] text-[var(--main-secondary)] ' : 'hover:text-[var(--main)] hover:border-[#F1E5E538] hover:bg-[#0B649F1A] text-gray-700'}`}
                onClick={() => {
                  handleVariantSelect(variant.id, option.id, option.variant_option_name);
                  setOpenSelectId(null);
                }}>
                <span className='flex-1 font-medium'>{option.variant_option_name}</span>
                {isSelected && <Check className='h-5 w-5 text-[var(--main-secondary)]' />}
              </div>
            );
          })}
        </motion.div>
      </div>
    );
  };

  const CustomRadio = ({ variant }) => {
    const currentOptions = getValues() || [];
    return (
      <div className='flex flex-wrap gap-2'>
        {variant.options.map(option => {
          const isSelected = currentOptions.includes(`${variant.id}_${option.id}`);
          return (
            <label key={option.id} className={`option flex items-center gap-2 cursor-pointer h-[36px] md:h-[38px] px-[9px] md:px-2.5 rounded-md text-sm transition-all duration-200 ${isSelected ? 'selected  ' : 'border-[#EFF2F4] hover:bg-[#0B649F1A]'} ${touchedVariants[variant.id] ? 'ring-1 ring-indigo-100' : ''} border-[1px] `} onClick={() => handleVariantSelect(variant.id, option.id, option.variant_option_name)}>
              <div className={`w-4 h-4 rounded-full border-[1px] flex items-center justify-center transition-colors ${isSelected ? 'border-white bg-white ' : 'border-[#dee1e3] border-[2px] '}`}>{isSelected && <Check className='h-[10px] w-[10px] text-[#0B649F]' strokeWidth={3} />}</div>
              <span className='title  font-medium'>{option.variant_option_name}</span>
            </label>
          );
        })}
      </div>
    );
  };

  const TextualButtonOption = ({ variant, option }) => {
    const isSelected = getValues()?.includes(`${variant.id}_${option.id}`);
    return (
      <button key={option.id} onClick={() => handleVariantSelect(variant.id, option.id, option.variant_option_name)} className={`option h-[36px] md:h-[38px] px-[9px] md:px-2.5 text-[14px] rounded-lg transition-all duration-200 font-medium border ${isSelected ? 'selected  ' : 'bg-[#F8FAFB]  hover:bg-[#0B649F1A]'} ${touchedVariants[variant.id] ? 'ring-1 ring-indigo-100' : ''}`}>
        <span className='title'>{option.variant_option_name}</span>
      </button>
    );
  };

  const ColorButtonOption = ({ variant, option }) => {
    const isSelected = getValues()?.includes(`${variant.id}_${option.id}`);
    return (
      <div key={option.id} onClick={() => handleVariantSelect(variant.id, option.id, option.variant_option_name)} className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${isSelected ? 'ring-2 ring-offset-2 ring-[#F1E5E538] scale-[1.1]' : 'ring-1 ring-[#F0F1F1] hover:ring-[#123770] hover:scale-[0.9] '} duration-500 `} style={{ backgroundColor: option.preview || '#ccc' }} title={option.variant_option_name}>
        {isSelected && <Check className='h-4 w-4 text-white' strokeWidth={3} />}
      </div>
    );
  };

  const TextAreaOption = ({ variant }) => {
    const currentOptions = getValues() || [];
    const currentValue = currentOptions.find(opt => opt.startsWith(`${variant.id}_`))?.split('_')[1] || '';
    // Local state for live typing
    const [textInput, setTextInput] = useState(currentValue);
    // Debounced value
    // Handle live typing
    const handleTextChange = (value) => {
      setTextInput(value);
    };

    const handleBlur = () => {
      handleVariantSelect(variant.id, textInput);
    };

    return (
      <div className={`relative transition-all duration-200 ${touchedVariants[variant.id] ? '' : ''}`}>
        <textarea
          className='ring-1 ring-indigo-100 w-full outline-none p-3.5 border-[1px] border-gray-100 rounded-lg focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all duration-200'
          placeholder={`أدخل ${variant.variant_name}`}
          value={textInput}
          onChange={e => handleTextChange(e.target.value)}
          onBlur={handleBlur}
        />
        {touchedVariants[variant.id] && textInput && (
          <div className='absolute -top-2 right-3 bg-white px-2 text-xs text-indigo-600 font-medium'>
            {variant.variant_name}
          </div>
        )}
      </div>
    );
  };

  const VariantOptions = ({ variant }) => {
    switch (variant.type) {
      case 1:
        return <CustomSelect variant={variant} />;
      case 2:
        return (
          <div className='flex flex-wrap gap-2'>
            {variant.options.map(option => (
              <TextualButtonOption key={option.id} variant={variant} option={option} />
            ))}
          </div>
        );
      case 3:
        return (
          <div className='flex flex-wrap gap-2'>
            {variant.options.map(option => (
              <ColorButtonOption key={option.id} variant={variant} option={option} />
            ))}
          </div>
        );
      case 4:
        return <CustomRadio variant={variant} />;
      // case 7:
      //   return <TextAreaOption variant={variant} />;
      default:
        return (
          <div className='flex flex-wrap gap-2'>
            {variant.options.map(option => (
              <TextualButtonOption key={option.id} variant={variant} option={option} />
            ))}
          </div>
        );
    }
  };

  return (
    variants?.length > 0 && showVariantDetails && (
      <div className='relative z-[1] space-y-4 md:space-y-5 mt-6 sm:mt-8 md:mt-10 lg:mt-12 variants' data-aos={dataAos}>
        {variants.map((variant, index) => (
          <div key={variant.id} className={`${cn} bg-white space-y-3 md:space-y-4`}>
            <div className={`${innerCn} flex flex-col gap-2.5 md:grid grid-cols-[auto,1fr] md:items-center md:gap-4`}>
              <div className={`${labelCn} flex items-center min-w-[80px] w-full  gap-2`}>
                <h3 className='option_title text-[12px] md:text-[14px] lg:text-[16px] font-semibold'>{variant.variant_name}</h3>
                {Boolean(variant.is_required) && <span className='text-lg text-rose-500 font-medium'>*</span>}
              </div>

              <div className='transition-all duration-200'><VariantOptions variant={variant} /></div>
            </div>

            {showValidation && variant.is_required && !getValues()?.some(opt => opt.startsWith(`${variant.id}_`)) ? (
              <div className='flex items-center gap-2 text-rose-500 text-sm font-medium animate-pulse'>
                <AlertCircle className='h-4 w-4' />
                <span>
                  {variant.type === 7
                    ? `يرجى إدخال ${variant.variant_name}`
                    : `يرجى اختيار ${variant.variant_name}`}
                </span>

              </div>
            ) : ""}
          </div>
        ))}
      </div>
    )
  );
};
