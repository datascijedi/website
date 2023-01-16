// This script inserts a page-specific GitHub edit link in the footer of HTML files
// To Do: Change approach to use recursive search to find all HTML files and apply the nested
// paths to find the corresponding source files.

// Set paths
const source_root_path = '.';
const build_path_list = ['./_site', './_site/webinars', './_site/webinars/past', './_site/webinars/upcoming'];
const source_path_list = ['.', './webinars', './webinars/past', './webinars/upcoming'];

// Prepare list of source file names
const source_file_names = [];
for (const sp of source_path_list) {
    const source_files_raw = Array.from((Deno.readDirSync(sp)));
    for (const sf of source_files_raw) {
        source_file_names.push(sf.name);
    }
}

// Prepare for string replacement
const string_to_replace = 'GH-6c622c2fa6a54817'; // placeholder set in _quarto.yml
const dynamic_gh_html_pre = '<a class="nav-link" aria-label="Edit this page" href="';
const dynamic_gh_html_post = '">Edit this page</a>';
const dynamic_gh_html_post_fallback = '">Edit on GitHub</a>';

// Loop through build files and insert "Edit this page" into HTML files
for (const build_path of build_path_list) {
    const build_files = Deno.readDirSync(build_path);
    let source_file;
    let fallback = false;
    for (const f of build_files) {
        if (!f.isFile) continue;
        const f_split = f.name.split('.');
        if (f_split.length < 2) continue;
        if (f_split[1].toLowerCase() != 'html') continue;
        const f_without_ext = f_split[0];
        // Determine GitHub link based on source file type
        if (source_file_names.includes(f_without_ext + '.qmd')) {
            source_file = source_root_path + build_path.replace('./_site', '') + '/' + f_without_ext + '.qmd';
        }
        else if (source_file_names.includes(f_without_ext + '.md')) {
            source_file = source_root_path + build_path.replace('./_site', '') + '/'  + f_without_ext + '.md';
        }
        else if (source_file_names.includes(f_without_ext + '.ipynb')) {
            source_file = source_root_path + build_path.replace('./_site', '') + '/'  + f_without_ext + '.ipynb';
        }
        else if (source_file_names.includes(f_without_ext + '.Rmd')) {
            source_file = source_root_path + build_path.replace('./_site', '') + '/'  + f_without_ext + '.Rmd';
        }
        else {
            console.error(`No source file found for HTML build file: ${f.name}. Using fallback.`);
            fallback = true;
        }
        // Insert the GitHub link
        let replacement_string;
        let dynamic_gh_link;
        if (fallback) {
            dynamic_gh_link = `https://github.com/datascijedi/website`;
            replacement_string = dynamic_gh_html_pre + dynamic_gh_link + dynamic_gh_html_post_fallback;
        }
        else {
            if (source_file.charAt(0) == '.') source_file = source_file.slice(1);
            dynamic_gh_link = `https://github.com/datascijedi/website/edit/main/${source_file}`;
            replacement_string = dynamic_gh_html_pre + dynamic_gh_link + dynamic_gh_html_post;
        }
        const build_file_path = build_path + '/' + f.name;
        const file_string_in = Deno.readTextFileSync(build_file_path);
        const file_string_out = file_string_in.replace(string_to_replace, replacement_string);
        Deno.writeTextFileSync(build_file_path, file_string_out);
    }
}
