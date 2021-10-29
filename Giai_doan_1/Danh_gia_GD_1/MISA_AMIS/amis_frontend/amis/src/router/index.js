import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TheEmployee from '../components/layout/TheEmployee.vue'
import Overview from '../views/Overview.vue'
import Cash from '../views/Cash.vue'
import Deposit from '../views/Deposit.vue'
import Buy from '../views/Buy.vue'
import Sell from '../views/Sell.vue'
import Bill from '../views/Bill.vue'
import Stock from '../views/Stock.vue'
import Tool from '../views/Tool.vue'
import Assets from '../views/Assets.vue'
import Tax from '../views/Tax.vue'
import Price from '../views/Price.vue'
import General from '../views/General.vue'
import Budget from '../views/Budget.vue'
import Report from '../views/Report.vue'
import Finance from '../views/Finance.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/employees', name: 'Employees', component: TheEmployee },
  { path: '/overview', name: 'Overview', component: Overview },
  { path: '/cash', name: 'Cash', component: Cash },
  { path: '/deposit', name: 'Deposit', component: Deposit },
  { path: '/buy', name: 'Buy', component: Buy },
  { path: '/sell', name: 'Sell', component: Sell },
  { path: '/bill', name: 'Bill', component: Bill },
  { path: '/stock', name: 'Stock', component: Stock },
  { path: '/tool', name: 'Tool', component: Tool },
  { path: '/assets', name: 'Assets', component: Assets },
  { path: '/tax', name: 'Tax', component: Tax },
  { path: '/price', name: 'Price', component: Price },
  { path: '/general', name: 'General', component: General },
  { path: '/budget', name: 'Budget', component: Budget },
  { path: '/report', name: 'Report', component: Report },
  { path: '/finance', name: 'Finance', component: Finance },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
