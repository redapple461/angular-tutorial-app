// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine:{
        random: false
      }
    },
    test: {
      codeCoverageExclude: ['./app.component.ts']
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/hero-tour'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        each: { // thresholds per file
            statements: 75,
            lines: 75,
            branches: 75,
            functions: 75,
            overrides: {
              'src/app/app.component.ts': {
                statements: 0,
                lines: 0,
                branches: 0,
                functions: 0
              }
            }
        }
    }
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
