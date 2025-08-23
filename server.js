const express = require('express');
const path = require('path');
const app = express();

// تقديم الملفات الثابتة من مجلد البناء
app.use(express.static(path.join(__dirname, 'build')));

// // إعادة توجيه جميع الطلبات إلى index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// // تشغيل الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});