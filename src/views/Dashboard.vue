<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="AEON Eemployees"
          :value="this.totalusers"
          :percentage="{
            value: '+505%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-money-coins',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="Draft SOP"
          :value= this.inProgress
          :percentage="{
            value: '+3%',
            color: 'text-success',
          }"
          :icon="{
            component: ' ni ni-world',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="Reviewed SOP"
          :value= this.reviewed
          :percentage="{
            value: '-2%',
            color: 'text-danger',
          }"
          :icon="{
            component: 'ni ni-paper-diploma',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0">
        <mini-statistics-card
          title="Approved SOP"
          :value= this.approved
          :percentage="{
            value: '+5%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-cart',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
    </div>
    <div class="card">
  <div class="card-body">
    <h5 class="font-weight-bolder">CARA Features</h5>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="vertical-align: top;">SOP Archive</td>
          <td style="vertical-align: top;">To save existing SOP, Manuals, Memo, and other AEON-related processes for reference.<br><br>Important Note:<br>All Documents uploaded in the SOP Archive are considered valid until a newly drafted SOP is approved in the CARA system.<br><br>All New Business Units ("NBU") can refer to the existing SOP which are relevant to the New Business Process ("NBP"). The NBU is strongly advised to draft and formalize the SOP for their NBP as soon as possible.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;">SOP Library &amp; Generate SOP</td>
          <td style="vertical-align: top;">To generate and formalize new SOP via CARA system Review and Approval by the assigned ALC/ALT.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;">SOP Progress</td>
          <td style="vertical-align: top;">To show the current SOP Progress for each step of the formalization process; Draft, Review, and Approval.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;">Feedback</td>
          <td style="vertical-align: top;">For Users to provide feedback on the CARA system or any comments on the SOP for improvement.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;">CARA Name Format</td>
          <td style="vertical-align: top;">
            <ol>
              <li>Folder: Business Unit/Department - SOP Title</li>
              <li>File (SOP Archive): Type - SOP Title (Example: SOP - Stock/Memo - Stock/Checklist-Stock and so on.)</li>
              <li>File (SOP Library): SOP Title (by Process)</li>
              <li>Please use Sentence Letter (Example: Waste Management ✅ WASTE MANAGEMENT ❌)</li>
            </ol>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<br><br>
    <div class="row">
      <div class="col-lg-12 mb-lg-0 mb-4">
  <div class="card container mx-auto">
    <div class="card-body p-3">
      <div class="row">
        <div class="col-lg-6">
          <div class="d-flex flex-column h-200">
            <h5 class="font-weight-bolder">Latest Uploaded SOP</h5>
            <table class="table border">
              <thead>
                <tr>
                  <th>SOP Title</th>
                  <th>Uploaded By</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                  <td>Data 3</td>
                </tr>
                <!-- Add more rows here as needed -->
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
        </div>
      </div>
    </div>
  </div>
</div>
<div class="col-lg-5">
</div>

    </div>
    <div class="mt-4 row">
      <div class="mb-4 col-lg-5 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <reports-bar-chart
              id="chart-bar"
              title="active Users"
              description="(<strong>+23%</strong>) than last week"
              :chart="{
                labels: [
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                datasets: {
                  label: 'Sales',
                  data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
                },
              }"
              :items="[
                {
                  icon: {
                    color: 'primary',
                    component: faUsers,
                  },
                  label: 'users',
                  progress: { content: '37K', percentage: 60 },
                },
                {
                  icon: { color: 'info', component: faHandPointer },
                  label: 'clicks',
                  progress: { content: '200', percentage: 90 },
                },
                {
                  icon: { color: 'warning', component: faCreditCard },
                  label: 'Sales',
                  progress: { content: '435$', percentage: 30 },
                },
                {
                  icon: { color: 'danger', component: faScrewdriverWrench },
                  label: 'Items',
                  progress: { content: '43', percentage: 50 },
                },
              ]"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <!-- line chart -->
        <div class="card z-index-2">
          <gradient-line-chart
            id="chart-line"
            title="SOP Generated"
            description="<i class='fa fa-arrow-up text-success'></i>
      <span class='font-weight-bold'>4% more</span> in 2021"
            :chart="{
              labels: [
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              datasets: [
                {
                  label: 'SOP Generated',
                  data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                },
                {
                  label: 'SOP uploaded',
                  data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                },
              ],
            }"
          />
        </div>
      </div>
    </div>
    <div class="row my-4">
      <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
        <projects-card />
      </div>
      <div class="col-lg-4 col-md-6">
      </div>
    </div>
  </div>
</template>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import ProjectsCard from "./components/ProjectsCard.vue";
import axios from 'axios';
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "dashboard-default",
  data() {
    return {
      totalusers:'',
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
      inProgress:0,
      reviewed:0,
      approved:0
    };
  },
  components: {
    MiniStatisticsCard,
    ReportsBarChart,
    GradientLineChart,
    ProjectsCard,
  },
  created(){
  console.log('created')
  this.getTotalUsers()
  this.totalsops()
},
methods: {
  async getTotalUsers() {
    console.log('called')
    try {
      const response = await axios.get('https://api.caramyaeon.com.my/api/total_users');
      console.log(response.data)
      this.totalusers = response.data.Total_users;
      console.log('this is total users', this.totalusers)
    } catch (error) {
      console.error(error);
    }
  },
  async totalsops() {
    const response = await fetch('https://api.caramyaeon.com.my/api/total_generatesops');
    const data = await response.json();
     this.inProgress = data['In-Progress'];
    this.reviewed = data['Reviewed'];
    this.approved = data['Approved'];
    console.log(this.inProgress, this.reviewed, this.approved);
    // You can save these values in variables or use them as needed
  }
}
}
</script>
