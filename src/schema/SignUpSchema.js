import * as yup from 'yup';

export const SignUpSchema = yup.object({
  first_name: yup
    .string()
    .required('يرجى إدخال الاسم الأول')
    .min(2, 'الاسم الأول يجب أن يكون على الأقل حرفين'),

  phone: yup
    .string()
    .required('يرجى إدخال رقم الهاتف'),
  location: yup
    .string()
    .required('يرجى تحديد الموقع')
});
