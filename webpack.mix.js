const { mix } = require('laravel-mix');

mix.js('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    //asios
    .copy('node_modules/axios/dist/axios.min.js','public/js')
    //vuejs
    .copy('node_modules/vue/dist/vue.js','public/js')
    //input mask
    .copy('node_modules/inputmask/dist/jquery.inputmask.bundle.js','public/js')
    .copy('node_modules/inputmask/dist/inputmask/bindings/inputmask.binding.js','public/js')
    //sweet allert
    .copy('node_modules/sweetalert2/dist/sweetalert2.min.js','public/js')
    .copy('node_modules/sweetalert2/dist/sweetalert2.min.css','public/css')
    //Export buttons datatables
    .copy('node_modules/jzip/jzip.js','public/js')
    .copy('node_modules/pdfmake/build/pdfmake.min.js','public/js')
    .copy('node_modules/pdfmake/build/vfs_fonts.js','public/js')
    //toastr
    .copy('node_modules/toastr/build/toastr.min.css','public/css')
    .copy('node_modules/toastr/build/toastr.min.js','public/js')
    //Datatables bs4
    .copy('node_modules/datatables.net/js','public/plugins/datatables.net/js')
    .copy('node_modules/datatables.net-bs4/js','public/plugins/datatables.net-bs4/js')
    .copy('node_modules/datatables.net-bs4/css','public/plugins/datatables.net-bs4/css')
    //Datatables buttons
    .copy('node_modules/datatables.net-buttons/js','public/plugins/datatables.net-buttons/js')
    .copy('node_modules/datatables.net-buttons-bs4/js','public/plugins/datatables.net-buttons-bs4/js')
    .copy('node_modules/datatables.net-buttons-bs4/css','public/plugins/datatables.net-buttons-bs4/css')
    //Datatables Responsive
    .copy('node_modules/datatables.net-responsive/js','public/plugins/datatables.net-responsive/js')
    .copy('node_modules/datatables.net-responsive-bs4/js','public/plugins/datatables.net-responsive-bs4/js')
    .copy('node_modules/datatables.net-responsive-bs4/css','public/plugins/datatables.net-responsive-bs4/css')
    //datetimepicker
    .copy('node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css','public/css')
    .copy('node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js','public/js')
    //moment
    .copy('node_modules/moment/min/moment.min.js','public/js/moment')
    .copy('node_modules/moment/locale/es.js','public/js/moment')

var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
mix.webpackConfig({
    plugins: [
        new SWPrecacheWebpackPlugin({
            cacheId: 'pwa',
            filename: 'service-worker.js',
            staticFileGlobs: ['public/**/*.{css,eot,svg,ttf,woff,woff2,js,html}'],
            minify: true,
            stripPrefix: 'public/',
            handleFetch: true,
            dynamicUrlToDependencies: { //you should add the path to your blade files here so they can be cached
                //and have full support for offline first (example below)
                // '/': ['resources/views/welcome.blade.php'],
                // '/posts': ['resources/views/posts.blade.php']
            },
            staticFileGlobsIgnorePatterns: [/\.map$/, /mix-manifest\.json$/, /manifest\.json$/, /service-worker\.js$/],
            navigateFallback: '/',
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
                    handler: 'cacheFirst'
                },
                {
                    urlPattern: /^https:\/\/www\.thecocktaildb\.com\/images\/media\/drink\/(\w+)\.jpg/,
                    handler: 'cacheFirst'
                }
            ],
            // importScripts: ['./js/push_message.js']
        })
    ]
});

// mix.browserSync({
//     proxy: 'http://negocios.local',
//     open: false
// });
