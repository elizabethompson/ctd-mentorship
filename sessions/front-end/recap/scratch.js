const modules = {
  cssBasics: new Module('CSS Basics', '2.3', '/css-basics'),
  debugInChrome: new Module(
    'Debugging CSS with Chrome DevTools',
    '2.4',
    '/debugging-css-with-chrome-devtools',
    ModuleType.Workshop
  ),
  cssLayouts: new Module('CSS Layout Basics', '2.5', '/css-layout-basics'),
  responsiveLayouts: new Module('Responsive Layouts', '2.6', '/responsive-layouts'),
  flexbox: new Module('CSS Flexbox Layout', '2.7', '/css-flexbox-layout'),
  htmlForms: new Module('HTML Forms', '2.8', '/html-forms'),
  cssSelectors: new Module('CSS Selectors', '2.9', '/css-selectors'),
  bootstrapBasics: new Module('Bootstrap 4 Basics', '2.10', '/bootstrap-4-basics-2'),
  htmlTables: new Module('HTML Tables', '2.11', '/html-tables'),
  htmlVideoAudio: new Module('HTML Video and Audio', '2.12', '/html-video-and-audio-2'),
  mediaPlayer: new Module(
    'Create a Media Player with MediaElement.js',
    '2.13',
    '/create-a-media-player-with-mediaelementjs',
    ModuleType.Workshop
  ),
  optimizationIntro: new Module(
    'Intro to Front End Performance Optimization',
    '2.14',
    '/introduction-to-front-end-performance-optimization'
  ),
  ajaxBasics: new Module('AJAX Basics', '4.14', '/ajax-basics-2'),
  asyncJS: new Module(
    'Asynchronous Programming with JavaScript',
    '4.15',
    '/asynchronous-programming-with-javascript'
  ),
  fetchAPI: new Module(
    'Working with the Fetch API',
    '4.16',
    '/working-with-the-fetch-api',
    ModuleType.Workshop
  ),
  objectOrientedJS: new Module(
    'Object-Oriented JavaScript',
    '5.17',
    '/objectoriented-javascript-2'
  ),
  webAccessibility: new Module(
    'Web Accessibility Compliance',
    '5.18',
    '/web-accessibility-compliance'
  ),
  websiteOptimization: new Module('Website Optimization', '5.19', '/website-optimization'),
};

(function () {
  // create "ModuleType" enum
  const ModuleType = {
    Course: 'Course',
    Workshop: 'Workshop',
  };

  // create "Module" object constructor
  function Module(name, key, path, type = ModuleType.Course) {
    this.name = name;
    this.key = key;
    this.path = path;
    this.type = type;
  }

  // add "Module" prototype properties and methods
  Module.prototype.getPath = function () {
    return `https://teamtreehouse.com/library${this.path}`;
  };

  // EXAMPLE: create "Module" object instance
  const myModule = new Module('Example', '1.0');

  // create "Section" object constructor
  function Section(title, modules, length = 1) {
    this.title = title;
    this.modules = modules;
    this.length = length;
  }

  // add "Section" prototype properties and methods
  Section.prototype.addModule = (module) => this.modules.push(module);

  // retrieve module data
  const fetchModules = async () =>
    fetch('modules.json')
      .then((res) => res.json())
      .catch((err) => console.error(err.message));

  // render sections on UI
  const renderSections = async () => {
    // fetch module data
    const moduleData = await fetchModules();
    if (!moduleData) return;

    // create "Module" object instances
    const modules = moduleData.map((module) => new Module(module.name, module.path, module.type));
    console.log(modules);

    // EXAMPLE: create "Section" object instance
    const mySection = new Section('Example', [], 3);

    // create "Section" object instances
    const sections = [
      new Section('Section 1', [
        modules.cssBasics,
        modules.debugInChrome,
        modules.cssLayouts,
        modules.responsiveLayouts,
        modules.flexbox,
      ]),
      new Section('Section 2', [modules.htmlForms, modules.cssSelectors, modules.bootstrapBasics]),
      new Section('Section 3', [
        modules.htmlTables,
        modules.htmlVideoAudio,
        modules.mediaPlayer,
        modules.optimizationIntro,
      ]),
      new Section('Section 4', [modules.ajaxBasics, modules.asyncJS, modules.fetchAPI]),
      new Section(
        'Section 5',
        [modules.objectOrientedJS, modules.webAccessibility, modules.websiteOptimization],
        2
      ),
    ];

    const root = document.querySelector('#root');

    const sectionHTML = sections.map(
      (section) =>
        `<section class="my-5">
          <h2 class="h3 mb-3">${section.title}</h2>
          <div class="row">
            ${section.modules
              .map(
                (module) => `
              <div class="col-4 mb-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${module.name}</h5>
                    <a href="${module.getPath()}" class="btn btn-primary">View Module</a>
                  </div>
                </div>
              </div>
              `
              )
              .join('')}
          </div>
        </section>
        `
    );

    root.innerHTML = sectionHTML.join('');
  };

  renderSections();
})();
