const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadImages(imageUrls, outputDir = 'downloads') {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const fileName = `image-${i + 1}${path.extname(new URL(url).pathname)}`;
    const filePath = path.join(outputDir, fileName);

    try {
      const response = await axios.get(url, { responseType: 'stream' });
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log(`✅ تم تنزيل ${fileName}`);
    } catch (err) {
      console.error(`❌ فشل تنزيل ${url}: ${err.message}`);
    }
  }
}

// 👇 مرّر روابط الصور هنا
const imageLinks = [
  "https://images.pexels.com/photos/3394655/pexels-photo-3394655.jpeg",
"https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg",
"https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
"https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg",
"https://images.pexels.com/photos/3394656/pexels-photo-3394656.jpeg",
"https://images.pexels.com/photos/992761/pexels-photo-992761.jpeg",
"https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg",
"https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg",
"https://images.pexels.com/photos/315747/pexels-photo-315747.jpeg",
"https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg",
"https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
"https://images.pexels.com/photos/267395/pexels-photo-267395.jpeg",
"https://images.pexels.com/photos/267392/pexels-photo-267392.jpeg",
"https://images.pexels.com/photos/267393/pexels-photo-267393.jpeg",
"https://images.pexels.com/photos/267391/pexels-photo-267391.jpeg",
"https://images.pexels.com/photos/210647/pexels-photo-210647.jpeg",
"https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg",
"https://images.pexels.com/photos/270711/pexels-photo-270711.jpeg",
"https://images.pexels.com/photos/196657/pexels-photo-196657.jpeg",
"https://images.pexels.com/photos/211350/pexels-photo-211350.jpeg",
"https://images.pexels.com/photos/117413/pexels-photo-117413.jpeg",
"https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg",
"https://images.pexels.com/photos/211521/pexels-photo-211521.jpeg",
"https://images.pexels.com/photos/210645/pexels-photo-210645.jpeg",
"https://images.pexels.com/photos/112843/pexels-photo-112843.jpeg",
"https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg",
"https://images.pexels.com/photos/3394672/pexels-photo-3394672.jpeg",
"https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg",
"https://images.pexels.com/photos/3394657/pexels-photo-3394657.jpeg",
"https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg",
"https://images.pexels.com/photos/208119/pexels-photo-208119.jpeg",
"https://images.pexels.com/photos/4042807/pexels-photo-4042807.jpeg",
"https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
"https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg",
"https://images.pexels.com/photos/267382/pexels-photo-267382.jpeg",
"https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg",
"https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg",
"https://images.pexels.com/photos/3394660/pexels-photo-3394660.jpeg",
"https://images.pexels.com/photos/3394661/pexels-photo-3394661.jpeg",
"https://images.pexels.com/photos/3394662/pexels-photo-3394662.jpeg",
"https://images.pexels.com/photos/3394680/pexels-photo-3394680.jpeg",
"https://images.pexels.com/photos/3394681/pexels-photo-3394681.jpeg",
"https://images.pexels.com/photos/3394682/pexels-photo-3394682.jpeg",
"https://images.pexels.com/photos/3394683/pexels-photo-3394683.jpeg",
"https://images.pexels.com/photos/3394684/pexels-photo-3394684.jpeg",
"https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg",
"https://images.pexels.com/photos/374075/pexels-photo-374075.jpeg",
"https://images.pexels.com/photos/374076/pexels-photo-374076.jpeg",
"https://images.pexels.com/photos/374078/pexels-photo-374078.jpeg",
"https://images.pexels.com/photos/374079/pexels-photo-374079.jpeg",
"https://images.pexels.com/photos/34153/pexels-photo.jpg",
"https://images.pexels.com/photos/34154/pexels-photo.jpg",
"https://images.pexels.com/photos/34155/pexels-photo.jpg",
"https://images.pexels.com/photos/34156/pexels-photo.jpg",
"https://images.pexels.com/photos/34157/pexels-photo.jpg",
"https://images.pexels.com/photos/394568/pexels-photo-394568.jpeg",
"https://images.pexels.com/photos/394569/pexels-photo-394569.jpeg",
"https://images.pexels.com/photos/394570/pexels-photo-394570.jpeg",
"https://images.pexels.com/photos/394571/pexels-photo-394571.jpeg",
"https://images.pexels.com/photos/394572/pexels-photo-394572.jpeg"
];

// شغّل الوظيفة
downloadImages(imageLinks);
