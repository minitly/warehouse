<template>
    <!-- 轮播图 -->
      <div class="d-flex justify-content-center" 
          @mouseenter="pauseAutoPlay" 
          @mouseleave="startAutoPlay">
        <div class="carousel-wrapper" style="width: 80%; max-width: 1200px;">
          <!-- 图片列表 -->
          <div class="carousel" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="slide" v-for="(description, index) in descriptions" :key="index">
              <img :src="`/warehouse/announcementImg/img${index + 1}.png`" alt="轮播图" />
              <p class="description-text">{{ description }}</p>
            </div>
          </div>

          <!-- 控制按钮 -->
          <button class="control prev" @click="prevSlide">&#10094;</button>
          <button class="control next" @click="nextSlide">&#10095;</button>
        </div>
      </div>


      <div class="flex justify-center my-4">
        <button 
          @click="showArticles = !showArticles" 
          class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Show/Hide Article
        </button>
      </div>
      <!-- 文章列表 -->
      <div class="article-container" v-show = "showArticles">
        <h2 class="article-title">Warehouse management system</h2>
        <div class="article-content">
          <!-- 在这里添加你的文章内容 -->
          <h1>1. General Provisions</h1><br>
            <h2>objective</h2><br>
            In order to standardize the company's warehouse management, ensure the safe, accurate and efficient circulation of inventory materials, and improve the efficiency of warehouse operation, this system is specially formulated.<br>
            <h2>Scope of application</h2><br>
            This system applies to all warehouses and related staff of the company, including but not limited to warehouse managers, purchasing personnel, sales personnel, logistics personnel, etc.<br>
          <h1>2. Warehouse personnel management</h1><br>
            <h2>Job Responsibilities</h2><br>
            <strong>Warehouse manager:</strong> responsible for the daily warehouse operation, inventory counting, material storage and safekeeping, warehouse environment maintenance, etc.; Strictly implement the warehousing process to ensure that the accounts are consistent; Regularly inspect the inventory materials, and find and deal with abnormal situations in a timely manner. <br>
            <br>
            <strong>Purchasing personnel:</strong> responsible for purchasing the required materials in a timely manner according to the company's needs to ensure that the quality of the materials meets the requirements; Maintain good communication with suppliers and coordinate the supply and distribution of materials; Timely feedback of procurement information to the warehouse manager so that it is ready for warehousing. <br>
            <br>
            <strong>Salesperson:</strong> apply to the warehouse administrator for delivery in a timely manner according to the sales order; Assist the warehouse administrator to check the type, quantity, specification and other information of the delivered materials to ensure the accuracy of the delivery; Timely feedback to customers on the quality and quantity of materials. <br>
            <br>
            <strong>Logistics personnel:</strong> responsible for the transportation and distribution of warehouse materials; Ensure the safety of materials during transportation and avoid damage or loss of materials caused by improper transportation; Deliver the materials to the designated place on time, and complete the handover procedures with the consignee. <br>
            <br>
            <h2>Personnel training</h2><br>
            Regularly organize business training for warehouse management personnel and related personnel, including but not limited to warehouse management process, material storage knowledge, safe operation specifications, equipment use and maintenance, etc., so as to improve the professional quality and business ability of employees.
            <h2>Personnel assessment</h2><br>
            Establish an assessment mechanism for warehouse personnel, and conduct a comprehensive assessment of warehouse personnel from the aspects of work attitude, work efficiency, work quality, and teamwork; The assessment results are linked to employees' performance bonuses and promotions to motivate employees to work actively and improve the quality of work.<br>
            <h1>3. Material warehousing management</h1><br>
            <h2>Inbound requests</h2><br>
            Before the arrival of the materials, the procurement personnel need to submit the warehousing application to the warehouse administrator in advance, including the name of the material, the specification and model, the quantity, the estimated arrival time, the supplier information, etc.; The warehouse manager prepares for warehousing according to the application information, such as arranging the storage location, preparing handling tools, etc.<br>
            <h2>Material acceptance</h2><br>
            After the arrival of the materials, the warehouse manager shall check and accept the materials together with the procurement personnel and relevant quality inspection personnel (if applicable); The acceptance content includes whether the appearance quality, quantity, specification and model, certificate of conformity, quality inspection report, etc. of the materials meet the requirements of the procurement contract; For the materials that pass the acceptance, the warehouse administrator should go through the warehousing procedures in a timely manner, fill in the warehousing form, and record the details of the materials; For the unqualified materials, the storage should be refused, and the procurement personnel should be notified in time to contact the supplier for processing, and require them to replace or return the goods within the specified time.<br>
            <h2>Storage of supplies</h2><br>
            According to the nature, specification, weight and other factors of the materials, the storage location is reasonably arranged, so that the classified storage, neat and orderly; Flammable, explosive, toxic and other dangerous goods should be stored separately, and obvious warning signs should be set up, and relevant safety regulations should be strictly observed; For valuables or special materials, corresponding safety protection measures should be taken, such as locking, special supervision, etc., to ensure the safety of the materials.<br>
            <h1>4. the management of material delivery</h1><br>
            <h2>Outbound request</h2><br>
            Departments or personnel who need to use materials should submit an application to the warehouse administrator in advance, including the name of the material, specification and model, quantity, use, and department or personnel for use; The warehouse manager reviews the application according to the inventory situation, and handles the outbound procedures in a timely manner for the materials with sufficient inventory; For materials with insufficient inventory, the applicant department or personnel should be notified in time so that they can adjust the use plan or arrange procurement.<br>
            <h2>Distribution of supplies</h2><br>
            The warehouse manager distributes the materials accurately according to the approved outbound application; When distributing, the type, quantity, specification and other information of the materials should be checked to ensure that they are consistent with the application form; The requisitioning personnel should sign and confirm on the outbound list, and the warehouse administrator shall carry out accounting processing accordingly; For materials with a shelf life or expiration date, priority should be given to the materials that are close to the shelf life or expiration date to avoid the waste of expired materials.<br>
            <h2>Outbound records</h2><br>
            The warehouse administrator should timely and accurately record the material delivery information, including the delivery time, material name, specification and model, quantity, receiving department or personnel, use, etc., to ensure that the accounts are consistent; Regularly sort out and analyze the outbound records to provide data support for the company's material procurement and inventory management.<br>
            <h1>5. Inventory management</h1><br>
            <h2>Inventory counts</h2><br>
            Conduct regular inventory counts, including monthly, quarterly and annual counts; The monthly inventory is organized by the warehouse administrator himself, and a comprehensive inventory of key materials is carried out, and other materials are drawn; The quarterly inventory and annual inventory are led by the warehouse management department, and are jointly carried out with the financial department, procurement department and other relevant departments to conduct a comprehensive inventory of all inventory materials; In the process of inventory, the book quantity of inventory materials should be checked to see if the actual quantity is consistent, for the inventory profit, inventory loss of the material, should be timely to find out the reason, put forward treatment opinions, and report to the relevant departments for approval after accounting processing.<br>
            <h2>Inventory control</h2><br>
            According to the company's production and operation plan and material consumption law, reasonably determine the inventory control indicators of various materials, including the highest inventory, the lowest inventory, safety stock, etc.; Warehouse managers should pay close attention to inventory dynamics and timely feedback inventory information to procurement personnel, so that they can reasonably arrange procurement plans and avoid the occurrence of inventory backlog or outstocking; For materials with low inventory turnover rate and large capital occupation, the reasons should be analyzed and corresponding measures should be taken to optimize, such as adjusting the purchase batch and speeding up the material turnover.<br>
            <h2>Material maintenance</h2><br>
            According to the nature of the materials and storage requirements, regularly carry out maintenance and maintenance of the inventory materials; For materials that are susceptible to moisture and rust, moisture-proof and rust-proof measures should be taken, such as placing desiccant, coating anti-rust oil, etc.; For materials with shelf life or expiration date, the expiration date should be checked regularly, and the materials that are about to expire should be dealt with in a timely manner; For large equipment or valuable materials, it should be cleaned, inspected and maintained regularly to ensure that it is performing well.<br>
            <h1>6. Warehouse safety management</h1><br>
            <h2>Safety facilities are equipped</h2><br>
            The warehouse should be equipped with complete fire protection facilities, such as fire extinguishers, fire hydrants, fire alarms, etc., and be regularly inspected and maintained to ensure that they are in good condition; According to the nature of the stored items in the warehouse, it is equipped with corresponding ventilation equipment, moisture-proof equipment, insect-proof equipment, etc., to ensure that the warehouse environment meets the storage requirements; Install monitoring equipment at key locations such as warehouse entrances and exits, passages, etc., to monitor the warehouse in real time to prevent materials from being stolen or illegally invaded.<br>
            <h2>Safe Operating Practices</h2><br>
            Warehouse staff should strictly abide by the safety operation norms, correctly use handling tools and equipment, and avoid material damage or casualties caused by improper operation; When handling heavy objects, suitable handling tools should be used, such as forklifts, trolleys, etc., and attention should be paid to the balance and stability in the handling process; It is strictly forbidden to smoke and use open flames in the warehouse, and it is strictly forbidden to bring flammable and explosive materials into the warehouse; Regularly inspect and maintain the electrical equipment and wiring in the warehouse to prevent fires caused by electrical failures.<br>
            <h2>Safety inspection and hidden danger investigation</h2><br>
            Regularly organize warehouse safety inspections, including whether the fire-fighting facilities are in good condition, whether the safe passage is unblocked, whether the material storage meets the safety requirements, and whether the safety operation specifications are complied with; For the potential safety hazards found in the inspection, immediate measures should be taken to rectify them to ensure the safe operation of the warehouse; Establish safety inspection records and hidden danger rectification ledgers, and make detailed records of safety inspections and hidden danger rectification for tracking and review.<br>
            <h1>7. Warehouse environmental sanitation management</h1><br>
            <h2>Cleanliness and hygiene</h2><br>
            Keep the internal environment of the warehouse clean and tidy, regularly clean the floor, shelves, walls, etc., and remove dust, debris and garbage; Regularly organize and clean the materials in the warehouse to ensure that the surface of the materials is clean and tidy, free of stains, dust, etc.; Regularly clean and maintain the equipment and tools in the warehouse to keep them in good working order.<br>
            <h2>Environmental maintenance</h2><br>
            Reasonably control the temperature and humidity in the warehouse, and take corresponding measures such as ventilation, cooling, humidification and dehumidification according to the requirements of the stored materials to ensure that the warehouse environment meets the storage conditions of the materials; Keep the surrounding environment of the warehouse clean and tidy, and clean up the garbage, sundries and weeds around the warehouse in time to prevent the breeding and spread of pests.<br>
            <h1>8. Warehouse information management</h1><br>
            <h2>System construction</h2><br>
            Establish a sound warehouse management information system to realize the information management of warehouse materials in and out of storage, inventory, inventory and other businesses; The warehouse management information system should have the functions of data entry, query, statistics, analysis and so on, which can reflect the dynamic information of warehouse materials in real time and provide data support for the company's decision-making.<br>
            <h2>Data entry and maintenance</h2><br>
            The warehouse administrator should timely and accurately enter the material in and out of the warehouse information, inventory information, etc. into the warehouse management information system to ensure the accuracy and completeness of the system data; Regularly back up and maintain system data to prevent data loss or damage; Regularly clean and optimize the system data to improve the operating efficiency of the system.<br>
            <h2>System usage and management</h2><br>
            Warehouse management personnel and related business personnel should be proficient in the operation methods of the warehouse management information system, and carry out business operations in strict accordance with the system operation process; Regularly upgrade and maintain the warehouse management information system to ensure the stability and security of the system; Strengthen the authority management of the warehouse management information system, assign the corresponding system authority according to the job responsibilities of employees, and ensure the security and confidentiality of system data.<br>
            <h1>9. Handling of violations</h1><br>
            For violations of the warehouse management system, corresponding penalties will be given according to the severity of the circumstances, including but not limited to warnings, fines, transfer from posts, termination of labor contracts, etc.; For the economic losses of the company caused by the violation of the system, the relevant responsible persons shall be held liable for compensation; For serious violations,<br>


          
        </div>
      </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentIndex = ref(0)
const autoPlayTimer = ref(null)
const showArticles = ref(true);

const descriptions = [
  "Warehouse Workflow.",
  "Warehouse Transportation.",
  "Logistics System.",
  "You did a good job.",
  "Storage of goods.",
  "Warehouse Gate"
]
// 下一张
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % 6
}

// 上一张
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + 6) % 6
}

// 启动自动播放
const startAutoPlay = () => {
  if (!autoPlayTimer.value) {
    autoPlayTimer.value = setInterval(nextSlide, 5000) // 每5秒切换一次
  }
}

// 暂停自动播放
const pauseAutoPlay = () => {
  clearInterval(autoPlayTimer.value)
  autoPlayTimer.value = null
}

// 生命周期
onMounted(startAutoPlay)
onBeforeUnmount(pauseAutoPlay)
</script>

<style scoped>

.carousel-wrapper {
  position: relative;
  width: 80%;
  max-width: 1200px;
  overflow: hidden;
  margin: 0 auto;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  flex: 0 0 100%;
  min-width: 100%;
}

.slide img {
  width: 100%;/* 根据图片比例调整 */
  max-width: 1000px;
  margin: 0 auto;
  height: 500px; 
  object-fit: contain;
}

.control {
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 0 15px;
  cursor: pointer;
  height: 50px;
  border-radius: 4px;
  transition: background 0.3s;
  z-index: 10; /* 确保按钮显示在图片上方 */
}

.control:hover {
  background: rgba(0, 0, 0, 0.6);
}

.prev {
  left: 13%;
}

.next {
  right: 13%;
}

.description-text {
  bottom: 0; /* 定位到图片底部 */
  left: 0;
  z-index: 12; /* 确保文字在图片之上 */
  font-size: 1.5rem;
  /* 文本居中 */
  text-align: center;
}


/* 文章容器样式 */
.article-container {
  margin: 30px auto;
  padding: 20px;
  width: 80%;
  max-width: 100%;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
}

.article-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}

.article-content {
  font-size: 1rem;
  color: #555;
  text-align: justify;
}
.article-content p {
  margin-bottom: 15px;
}
h1{
  font-size: 1.5rem;
  margin-top: 15px;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}
h2{
  font-size: 1.2rem;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
  text-indent: 2em;
}

</style>