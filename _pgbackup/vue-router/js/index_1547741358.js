Vue.use(VueRouter);

var AboutComponent = Vue.extend({
  template: "#about-component-template"
});

var WorkComponent = Vue.extend({
  template: "#work-component-template"
});

var SubRoute1Component = Vue.extend({
  template: '#subroute-component-template',
  data() {
    return {
      number: 1,
      color: "#EAFFD0"
    }
  }
});

var SubRoute2Component = Vue.extend({
  template: '#subroute-component-template',
  data() {
    return {
      number: 2,
      color: "#95E1D3"
    }
  }
});

var ContactComponent = Vue.extend({
  template: "#contact-component-template"
});

var router = new VueRouter();

router.map({
  '/about': {
    component: AboutComponent
  },
  '/work': {
    component: WorkComponent,
    subRoutes: {
      '/subroute1': {
        component: SubRoute1Component
      },
      'subroute2': {
        component: SubRoute2Component
      }
    }
  },
  '/contact': {
    component: ContactComponent
  }
});

var App = Vue.extend({});
router.start(App, "#app");