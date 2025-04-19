document.addEventListener('DOMContentLoaded', function() {
  const marqueeContainer = document.querySelector('.marquee-text-container');

  if (marqueeContainer) {
    // ลบ marquee เดิมและ div ที่มีรูปลำโพง
    const marquee = marqueeContainer.querySelector('marquee');
    if (marquee) marquee.remove();

    const speakerDiv = document.querySelector('.marquee-text-container .announcer div:has(> img[src*="speaker.png"])');
    if (speakerDiv) {
      speakerDiv.remove();
    }

    // เพิ่ม unique class ให้กับ container เพื่อทำ scoped CSS
    marqueeContainer.classList.add('gu-withdrawal-widget');

    // สร้าง container ใหม่
    marqueeContainer.innerHTML = `
      <div class="gu-withdrawal-container">
        <div class="gu-withdrawal-slider">
          <!-- รายการถอนเงินจะถูกเพิ่มโดย JavaScript -->
        </div>
      </div>
    `;

    // CSS ที่จัดระเบียบใหม่ - ลบคลาสซ้ำและปรับปรุงคุณสมบัติ
    const style = document.createElement('style');
    style.textContent = `
      /* Scoped CSS with gu-withdrawal-widget prefix */
      .gu-withdrawal-widget .gu-withdrawal-container {
        flex: 1 1 0%;
        height: 100%;
        width: 100%;
        min-height: 45px;
        overflow: hidden;
        position: relative;
        background: rgba(111, 255, 183, 0.1);
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(122, 12, 12, 0.05);
      }

      .gu-withdrawal-widget .gu-withdrawal-slider {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        transition: transform 0.5s ease;
        position: relative;
      }

      .gu-withdrawal-widget .user-id.withdraw-text-highlight {
        margin-top: 1px;
      }

      .gu-withdrawal-widget .withdrawal-item {
        margin: 0 1.5%;
        padding: 2% 2.5%;
        background: linear-gradient(135deg, rgb(250, 255, 230) 0%, rgb(213, 241, 199) 100%);
        border-radius: 8px;
        white-space: nowrap;
        color: rgb(63, 31, 1);
        border: 1px solid rgba(47, 211, 96, 0.3);
        box-shadow: 0 2px 4px rgba(0, 32, 4, 0.08);
        opacity: 0.9;
        transform-origin: center;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .gu-withdrawal-widget .withdrawal-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-color: rgba(75, 75, 75, 0.6);
      }

      .gu-withdrawal-widget .withdrawal-item.new-item {
        animation: guWithdrawalFadeIn 0.6s ease-out;
      }

      .gu-withdrawal-widget .withdrawal-item.exit-item {
        animation: guWithdrawalFadeOut 0.6s ease-in;
      }

      @keyframes guWithdrawalFadeIn {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 0.9; transform: translateX(0); }
      }

      @keyframes guWithdrawalFadeOut {
        from { opacity: 0.9; transform: translateX(0); }
        to { opacity: 0; transform: translateX(-20px); }
      }

      /* Add border shine animation with unique name */
      @keyframes guBorderShine {
        0% { border-color: rgba(47, 211, 96, 0.3); box-shadow: 0 3px 8px rgba(0, 32, 4, 0.1), 0 0 5px rgba(255, 255, 100, 0); }
        50% { border-color: rgba(255, 215, 0, 0.8); box-shadow: 0 3px 8px rgba(0, 32, 4, 0.1), 0 0 15px 5px rgba(255, 255, 100, 0.7); }
        100% { border-color: rgba(47, 211, 96, 0.3); box-shadow: 0 3px 8px rgba(0, 32, 4, 0.1), 0 0 5px rgba(255, 255, 100, 0); }
      }

      /* Class to apply the border shine */
      .gu-withdrawal-widget .large-withdrawal-highlight {
        animation: guBorderShine 1.5s infinite ease-in-out;
        border-width: 2px; /* Ensure border is visible */
      }

      .gu-withdrawal-widget .item-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative; /* Added for potential absolute positioning if needed */
      }

      .gu-withdrawal-widget .congrats-message { /* New style for Line 1 */
        font-weight: bold;
        color: rgb(255, 11, 85); /* Adjust color if needed */
        width: 100%;
        text-align: center; /* Center the congrats message */
        margin-bottom: 10px; /* Space below congrats */
        line-height: 0.5;
      }

      .gu-withdrawal-widget .detail-section {
        display: flex;
        align-items: center; /* Vertically align logo and text block */
        width: 100%;
        gap: 10px; /* Space between logo and text block */
      }

      .gu-withdrawal-widget .bank-logo {
        display: flex;
        align-items: center;
        /* Removed margin-left */
      }

      .gu-withdrawal-widget .bank-logo img {
        height: auto;
        max-width: 60px; /* Increased logo size */
        min-width: 56px; /* Increased logo size */
        /* margin-left: 15px; */ /* Removed */
        margin-right: 0; /* Reset margin */
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
        object-fit: contain;
      }

      .gu-withdrawal-widget .details-container { /* New container for lines 2, 3, 4 */
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* Align text to the right */
        flex: 1; /* Take remaining space */
        text-align: right; /* Ensure text aligns right */
      }

      .gu-withdrawal-widget .user-info { /* New style for Line 2 */
        font-size: 1.0rem;
        font-weight: bold;
        color: rgb(136, 194, 115);
        margin-bottom: 2px;
      }

      .gu-withdrawal-widget .amount-display { /* New style for Line 3 */
        margin-bottom: 2px;
        line-height: 1; /* Adjust line height for amount */
      }

      /* Keep amount-highlight specific styles */
      .gu-withdrawal-widget .amount-highlight {
        font-weight: bold;
        font-size: 2.5rem; /* Base size, will be overridden by media queries */
        background: linear-gradient(45deg, #5cb338, #8ed066);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding: 0; /* Remove padding */
        margin-bottom: 0; /* Remove margin */
        display: inline; /* Change to inline */
      }

      .gu-withdrawal-widget .meta-info { /* New style for Line 4 */
        font-size: 0.7rem;
        opacity: 0.8;
        display: flex; /* Use flex to space out user/date */
        justify-content: flex-end; /* Align items to the right */
        gap: 8px; /* Space between user ID and date */
        width: 100%; /* Ensure it takes full width of container */
      }

      /* Mobile Styles */
      @media (max-width: 768px) {
        .gu-withdrawal-widget .gu-withdrawal-container {
          overflow: visible;
          height: auto;
          min-height: 56px;
        }

        .gu-withdrawal-widget .gu-withdrawal-slider {
          justify-content: center !important;
          width: 100%;
          padding: 1% 0;
        }

        .gu-withdrawal-widget .withdrawal-item {
          text-align: center;
          transform-origin: center;
          min-width: 250px;
          padding: 3% 4%; /* Adjust padding */
          transition: all 0.5s ease;
          position: relative;
          border-width: 1px;
        }

        .gu-withdrawal-widget .withdrawal-item.left {
          transform: scale(0.90);
          opacity: 0.8;
          width: 30%;
          max-width: 30%;
          z-index: 1;
          margin-right: -40%;
        }

        .gu-withdrawal-widget .withdrawal-item.center {
          transform: scale(1.13);
          opacity: 1;
          z-index: 10;
          width: 60%;
          max-width: 60%;
          box-shadow: 0 4px 12px rgba(157, 192, 139, 0.2);
          border-color: rgba(157, 192, 139, 0.8);
        }

        .gu-withdrawal-widget .withdrawal-item.right {
          transform: scale(0.90);
          opacity: 0.8;
          width: 30%;
          max-width: 30%;
          z-index: 1;
          margin-left: -40%;
        }

        .gu-withdrawal-widget .withdrawal-item.left .item-content,
        .gu-withdrawal-widget .withdrawal-item.right .item-content {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .gu-withdrawal-widget .congrats-message {
          font-size: 1.2rem;
          margin-bottom: 5px;
        }

        .gu-withdrawal-widget .bank-logo img {
          width: 65px;
          min-width: 56px;
        }

        .gu-withdrawal-widget .details-container {
          gap: 1px; /* Reduce gap on mobile */
        }

        .gu-withdrawal-widget .user-info {
          font-size: 0.8rem;
        }

        .gu-withdrawal-widget .amount-highlight {
          font-size: 1.5rem !important; /* Mobile specific highlight size */
        }

        .gu-withdrawal-widget .meta-info {
          font-size: 0.65rem;
          gap: 5px;
        }
      }

      /* Desktop Styles */
      @media (min-width: 769px) {
        .gu-withdrawal-widget .gu-withdrawal-slider {
          justify-content: center !important; /* Center items like mobile */
          padding: 1% 0; /* Add padding like mobile */
        }

        .gu-withdrawal-widget .withdrawal-item {
          /* Base desktop item styles for 3 items */
          min-width: 350px; /* Adjust min-width for 3 items */
          max-width: 400px; /* Adjust max-width */
          flex: 0 1 auto;
          border-radius: 12px;
          border: 1.5px solid rgba(47, 211, 96, 0.4);
          box-shadow: 0 3px 8px rgba(0, 32, 4, 0.1);
          padding: 12px 18px; /* Adjust padding */
          position: relative;
          transition: all 0.5s ease;
          transform-origin: center;
        }

        .gu-withdrawal-widget .congrats-message {
          margin-bottom: 5px;
        }

        /* Styles for 3 items in desktop - similar to mobile but adjusted */
        .gu-withdrawal-widget .withdrawal-item.left {
          transform: scale(0.95); /* Slightly larger scale than mobile */
          opacity: 0.8;
          z-index: 1;
          margin-right: -40%; /* Adjust overlap for desktop */
        }

        .gu-withdrawal-widget .withdrawal-item.center {
          transform: scale(1.13); /* Larger scale for desktop center */
          opacity: 1;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(157, 192, 139, 0.2);
          border-color: rgba(157, 192, 139, 0.8);
        }

        .gu-withdrawal-widget .withdrawal-item.right {
          transform: scale(0.95); /* Slightly larger scale than mobile */
          opacity: 0.8;
          z-index: 1;
          margin-left: -40%; /* Adjust overlap for desktop */
        }

        /* Hide content in side items */
        .gu-withdrawal-widget .withdrawal-item.left .item-content,
        .gu-withdrawal-widget .withdrawal-item.right .item-content {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          opacity: 0.8; /* Adjust opacity if needed */
        }

        .gu-withdrawal-widget .congrats-message {
          font-size: 1.88rem;
          margin-top: 10px;
        }

        .gu-withdrawal-widget .bank-logo img {
          width: 85px; /* Larger logo on desktop */
          min-width: 70px;
        }

        .gu-withdrawal-widget .user-info {
          font-size: 1.2rem;
          margin-top: 10px;
        }

        .gu-withdrawal-widget .amount-highlight {
          font-size: 2.7rem !important; /* Desktop specific highlight size */
        }

        .gu-withdrawal-widget .meta-info {
          font-size: 0.75rem;
        }
      }
    `;

    document.head.appendChild(style);

    // เพิ่มรายชื่อคนไทยสำหรับการสุ่ม
    const thaiNames = [
      'สมชาย', 'วรรณา', 'อรุณ', 'มานะ', 'รุ่งนภา', 'พิทักษ์', 'กัญญา', 'สมศักดิ์',
      'พรทิพย์', 'ชาติชาย', 'อรพรรณ', 'ประเสริฐ', 'ธนากร', 'กรรณิการ์', 'สุทธิพงษ์', 'อาทิตย์',
      'ธิดา', 'สุภาพร', 'ไพบูลย์', 'ปรีชา', 'วันดี', 'นงลักษณ์', 'สมหมาย', 'เอกชัย', 'สุนทร',
      'นิภา', 'วราภรณ์', 'สุพจน์', 'ทิพวรรณ', 'ธีรพงษ์', 'พิมพ์พร', 'ปัญญา', 'จันทร์เพ็ญ',
      'อัมพร', 'อนุพงษ์', 'ศิริพร', 'ภานุวัฒน์', 'จรัญ', 'เกศินี', 'อนันต์', 'ชูชาติ', 'รัชนี',
      'บุญเรือง', 'อัญชลี', 'เฉลิมพล', 'ประภาส', 'สุรีย์', 'นิพนธ์', 'ดารณี', 'นิรันดร์', 'จิรา'
    ];

    // เปลี่ยนจากรายชื่อตายตัวเป็นการดึงข้อมูลจาก API
    let nameCache = [...thaiNames]; // เริ่มต้นด้วยรายชื่อที่มีอยู่แล้ว
    let isLoadingNames = false;

    // ฟังก์ชันดึงชื่อจาก kidhaina.com
    async function fetchThaiNames() {
      if (isLoadingNames) return;
      isLoadingNames = true;
      try {
        const response = await fetch('https://kidhaina.com/thainamegenerator');
        const html = await response.text();

        // ใช้ regular expression เพื่อดึงชื่อจาก HTML
        const namePattern = /<div class="name-list">\s*<ul>([\s\S]*?)<\/ul>\s*<\/div>/;
        const listItemPattern = /<li>(.*?)<\/li>/g;

        const match = html.match(namePattern);
        if (match && match[1]) {
          const nameList = match[1];
          let nameMatch;
          const names = [];

          while ((nameMatch = listItemPattern.exec(nameList)) !== null) {
            names.push(nameMatch[1].trim());
          }

          if (names.length > 0) {
            // เพิ่มชื่อใหม่เข้าไปในแคช
            nameCache = [...new Set([...nameCache, ...names])];
            console.log(`ดึงชื่อจาก kidhaina.com สำเร็จ: เพิ่ม ${names.length} ชื่อ, รวมทั้งหมด ${nameCache.length} ชื่อ`);
          } else {
            console.warn('ไม่พบชื่อใน HTML ที่ดึงมา');
          }
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงชื่อ:', error);
      } finally {
        isLoadingNames = false;
      }
    }

    // ฟังก์ชันสุ่มชื่อภาษาไทย
    function getRandomThaiName() {
      // สุ่มจากแคชที่มีอยู่
      const randomName = nameCache[Math.floor(Math.random() * nameCache.length)];
      // พยายามดึงชื่อใหม่เพิ่มเติม (แบบไม่บล็อก)
      if (!isLoadingNames && Math.random() < 0.1) { // 10% โอกาสในการดึงข้อมูลใหม่
        fetchThaiNames();
      }
      return randomName;
    }

    // ดึงชื่อจาก kidhaina.com เมื่อเริ่มต้น
    fetchThaiNames();

    // ฟังก์ชันสุ่มชื่อผู้ใช้ที่ดูสมจริงมากขึ้น - แก้ไขให้เป็นรูปแบบ GUxXXXx
    function getRandomUser() {
      const prefix = 'AAGU';
      const suffix = 'x';
      // สุ่มตัวเลข 3 หลัก
      const middle = Math.floor(100 + Math.random() * 900);
      return `${prefix}xx${middle}${suffix}x`;
    }

    // ฟังก์ชันดึง 3 ตัวสุดท้ายของรหัสผู้ใช้ - ปรับให้รองรับรูปแบบใหม่
    function getLastThreeDigits(user) {
      // ดึง 3 ตัวเลขจากกลางตามรูปแบบ GUxXXXx
      const match = user.match(/GUx(\d{3})x/);
      if (match && match[1]) {
        return match[1];
      }

      // ยังคงรองรับรูปแบบเดิม xxxx0000xx สำหรับข้อมูลตัวอย่าง
      const oldMatch = user.match(/(\d{3,4})xx$/);
      if (oldMatch && oldMatch[1]) {
        const digits = oldMatch[1];
        return digits.slice(-3);
      }

      return "000"; // ค่าเริ่มต้นถ้าไม่พบรูปแบบที่ต้องการ
    }

    // ข้อมูลตัวอย่าง - ปรับรูปแบบให้เป็น GUxXXXx
    const withdrawals = [
      { icon: '6.png', user: 'GUx853x', date: '17/4/68 18:25', amount: '14,262.00', name: 'สมชาย' },
      { icon: '3.png', user: 'GUx937x', date: '17/4/68 18:25', amount: '17,488.00', name: 'วรรณา' },
      { icon: '6.png', user: 'GUx916x', date: '17/4/68 18:25', amount: '4,092.00', name: 'อรุณ' },
      { icon: '2.png', user: 'GUx123x', date: '17/4/68 18:25', amount: '5,000.00', name: 'มานะ' },
      { icon: '4.png', user: 'GUx567x', date: '17/4/68 18:25', amount: '7,500.00', name: 'รุ่งนภา' },
      { icon: '1.png', user: 'GUx345x', date: '17/4/68 18:25', amount: '9,800.00', name: 'พิทักษ์' },
      { icon: '5.png', user: 'GUx789x', date: '17/4/68 18:25', amount: '12,500.00', name: 'กัญญา' },
      { icon: '2.png', user: 'GUx246x', date: '17/4/68 18:26', amount: '21,000.00', name: 'สมศักดิ์' }
    ];

    const slider = marqueeContainer.querySelector('.gu-withdrawal-slider');
    let highlightedItemElement = null; // Track the highlighted item

    // ฟังก์ชันสุ่มยอดถอนตามโอกาส
    function getRandomAmount() {
      const ranges = [
        { min: 500, max: 2000, weight: 40 },
        { min: 2001, max: 5000, weight: 30 },
        { min: 5001, max: 20000, weight: 20 },
        { min: 20001, max: 50000, weight: 8 },
        { min: 50001, max: 100000, weight: 2 }
      ];

      const weightedList = ranges.flatMap(range =>
        Array(range.weight).fill(range)
      );

      const selectedRange = weightedList[Math.floor(Math.random() * weightedList.length)];
      const randomAmount = Math.random() * (selectedRange.max - selectedRange.min) + selectedRange.min;
      // เปลี่ยนการรูปแบบตัวเลขให้มี comma กั้นหลักพัน
      return formatNumberWithCommas(randomAmount.toFixed(2));
    }

    // เพิ่มฟังก์ชันใหม่สำหรับการจัดรูปแบบจำนวนเงินให้มี comma separator
    function formatNumberWithCommas(number) {
      // แยกส่วนจำนวนเต็มกับทศนิยม
      const parts = number.toString().split('.');
      // ใส่ comma ในส่วนจำนวนเต็ม โดยเริ่มจากท้ายไปหน้า ทุกๆ 3 ตำแหน่ง
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      // รวมจำนวนเต็มกับทศนิยมกลับเข้าด้วยกัน
      return parts.join('.');
    }

    // ฟังก์ชันสร้างรูปแบบวันที่เวลาปัจจุบัน
    function getCurrentDateTime() {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = (now.getFullYear() + 543) % 100;  // แปลงเป็นปี พ.ศ. และเอาแค่ 2 หลักสุดท้าย
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    // เลือกไอคอนแบบสุ่ม
    function getRandomIcon() {
      const icons = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];
      return icons[Math.floor(Math.random() * icons.length)];
    }

    // สร้างรายการถอนเงินทั้งหมดตั้งแต่เริ่มต้น
    function initializeWithdrawals() {
      const slider = marqueeContainer.querySelector('.gu-withdrawal-slider');
      slider.innerHTML = '';

      const isMobile = window.innerWidth <= 768;
      const numItems = 3; // Always show 3 items

      for (let i = 0; i < numItems; i++) {
        const itemIndex = i % withdrawals.length;
        const item = withdrawals[itemIndex];
        const lastThreeDigits = getLastThreeDigits(item.user);
        const itemElement = document.createElement('div');

        // กำหนด class ตามตำแหน่ง (same for mobile and desktop)
        if (i === 0) itemElement.className = 'withdrawal-item left';
        else if (i === 1) itemElement.className = 'withdrawal-item center';
        else itemElement.className = 'withdrawal-item right';
        // Remove desktop specific class assignment logic
        // else { ... }

        itemElement.innerHTML = `
          <div class="item-content">
            <div class="congrats-message">GU899 ขอแสดงความยินดี</div>
            <div class="detail-section">
              <div class="bank-logo">
                <img src="https://banfah99.com/img/${item.icon}" alt="Bank Icon">
              </div>
              <div class="details-container">
                <div class="user-info">คุณ : <span class="withdraw-text-highlight">${item.name}</span> ถอนเงินสำเร็จ</div>
                <div class="amount-display"><span class="amount-highlight">${item.amount}</span></div>
                <div class="meta-info">
                  <span class="user-id withdraw-text-highlight">${item.user}</span>
                  <span class="separator">|</span>
                  <span class="date-time withdraw-text-highlight">${item.date}</span>
                </div>
              </div>
            </div>
          </div>
        `;
        slider.appendChild(itemElement);
      }
    }

    // เริ่มต้นแสดงรายการ
    initializeWithdrawals();

    // ปรับปรุงฟังก์ชัน updateWithdrawals ให้มี animation ที่ต่อเนื่องแบบวน loop
    function updateWithdrawals() {
      const slider = marqueeContainer.querySelector('.gu-withdrawal-slider');
      const expectedItems = 3; // Always expect 3 items
      let isNewItemLarge = false; // Flag for the newly added item

      if (slider.children.length === expectedItems) {
        slider.children[0].classList.add('exit-item');

        const newData = {
          icon: getRandomIcon(),
          user: getRandomUser(),
          date: getCurrentDateTime(),
          amount: getRandomAmount(),
          name: getRandomThaiName()
        };

        // Check if the new amount is large
        const numericAmount = parseFloat(newData.amount.replace(/,/g, ''));
        isNewItemLarge = numericAmount >= 30000;

        setTimeout(() => {
          if (slider.children.length > 0) {
            slider.removeChild(slider.children[0]);
          }

          if (slider.children[0]) {
              slider.children[0].classList.remove('center');
              slider.children[0].classList.add('left');
          }
          if (slider.children[1]) {
              slider.children[1].classList.remove('right');
              slider.children[1].classList.add('center');
          }

          const itemElement = document.createElement('div');
          const newClass = 'right';
          itemElement.className = `withdrawal-item ${newClass} new-item`;
          const lastThreeDigits = getLastThreeDigits(newData.user);

          itemElement.innerHTML = `
            <div class="item-content">
              <div class="congrats-message">GU899 ขอแสดงความยินดี</div>
              <div class="detail-section">
                <div class="bank-logo">
                  <img src="https://banfah99.com/img/${newData.icon}" alt="Bank Icon">
                </div>
                <div class="details-container">
                  <div class="user-info">คุณ : <span class="withdraw-text-highlight">${newData.name}</span> ถอนเงินสำเร็จ</div>
                  <div class="amount-display"><span class="amount-highlight">${newData.amount}</span></div>
                  <div class="meta-info">
                    <span class="user-id withdraw-text-highlight">${newData.user}</span>
                    <span class="separator">|</span>
                    <span class="date-time withdraw-text-highlight">${newData.date}</span>
                  </div>
                </div>
              </div>
            </div>
          `;

          // Add highlight class if the new item is large
          if (isNewItemLarge) {
            itemElement.classList.add('large-withdrawal-highlight');
            highlightedItemElement = itemElement; // Track the highlighted item
          }

          slider.appendChild(itemElement);

          setTimeout(() => {
            itemElement.classList.remove('new-item');
          }, 600);
        }, 400);
      } else if (slider.children.length !== expectedItems) {
          console.warn(`Incorrect item count (${slider.children.length}), re-initializing.`);
          initializeWithdrawals();
      }
      return isNewItemLarge; // Return status of the new item
    }

    // ปรับปรุงการแสดงผลเมื่อขนาดหน้าจอเปลี่ยน
    window.addEventListener('resize', () => {
      // ล้าง timeout ที่กำลังทำงานอยู่เพื่อป้องกันการอัพเดทซ้ำซ้อน
      if (window.updateTimeout) {
        clearTimeout(window.updateTimeout);
      }

      // รีเซ็ตและสร้างรายการใหม่ทั้งหมดเมื่อหน้าจอเปลี่ยนขนาด
      initializeWithdrawals();

      // เริ่มการอัพเดทใหม่หลังจากปรับขนาดหน้าจอ
      if (window.autoUpdateEnabled) {
        scheduleNextUpdate();
      }
    });

    // อัพเดทรายการด้วยระยะเวลาสุ่ม, รับค่า delay ที่อาจ override ได้
    function scheduleNextUpdate(delayOverride) {
      let delay;
      if (delayOverride !== undefined) {
        delay = delayOverride;
        // console.log(`Using override delay: ${delay / 1000}s`);
      } else {
        // Default random delay: 5 to 15 seconds
        delay = Math.random() * 10000 + 5000;
        // console.log(`Using random delay: ${delay / 1000}s`);
      }

      // Clear previous timeout if any
      if (window.updateTimeout) {
        clearTimeout(window.updateTimeout);
      }

      window.updateTimeout = setTimeout(() => {
        // Remove highlight from the previous item *before* updating
        if (highlightedItemElement) {
          highlightedItemElement.classList.remove('large-withdrawal-highlight');
          highlightedItemElement = null;
        }

        // Update the withdrawals and check if the new item is large
        const isNewItemLarge = updateWithdrawals();

        // Determine the next delay
        const nextDelay = isNewItemLarge ? 20000 : undefined; // 20s if large, undefined for random next time

        // Schedule the *next* update
        scheduleNextUpdate(nextDelay);

      }, delay); // Use the calculated delay for *this* timeout
      return window.updateTimeout;
    }

    // ตัวแปรสำหรับควบคุมการอัพเดทอัตโนมัติ
    window.autoUpdateEnabled = true;

    // เริ่มต้นการอัพเดทรายการอัตโนมัติ (ใช้ delay เริ่มต้นแบบสุ่ม)
    scheduleNextUpdate();

    // เพิ่ม method เพื่อให้สามารถเรียกใช้จากภายนอกได้
    window.initializeWithdrawals = initializeWithdrawals;
    window.updateWithdrawals = updateWithdrawals;
    window.scheduleNextUpdate = scheduleNextUpdate;
  }
});
