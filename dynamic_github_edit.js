// This script inserts a page-specific GitHub edit link in the footer of HTML files
// To Do: Change approach to use recursive search to find all HTML files and apply the nested
// paths to find the corresponding source files.

// Set paths
var source_path = '.';
var build_path_list = ['./_site', './_site/webinars', './_site/webinars/past', './_site/webinars/upcoming'];

// Prepare list of source file names
var source_files_raw = Array.from((Deno.readDirSync(source_path)));
var source_file_names = Array();
for (const sf of source_files_raw) {
    source_file_names.push(sf.name);
}

// Prepare for string replacement
var string_to_replace = 'GH-6c622c2fa6a54817'; // placeholder set in _quarto.yml
var dynamic_gh_html_pre = '<div>' +
                          '<p><a aria-label="Edit this page" href="';
var dynamic_gh_html_post = '"><div><i class="bi bi-github" aria-hidden="true"></i></div>Edit this page</a></p>' +
                           '</div>';
var dynamic_gh_html_post_fallback = '"><div><i class="bi bi-github" aria-hidden="true"></i></div>Edit on GitHub</a></p>' +
                                    '</div>';


for (const build_path of build_path_list) {
    // Loop through build files and insert "Edit this page" into HTML files
    let build_files = Deno.readDirSync(build_path);
    const decoder = new TextDecoder("utf-8");
    const encoder = new TextEncoder("utf-8");
    let source_file;
    let fallback = false;
    for (const f of build_files) {
        if (!f.isFile) continue;
        let f_split = f.name.split('.');
        if (f_split.length < 2) continue;
        if (f_split[1].toLowerCase() != 'html') continue;
        let f_without_ext = f_split[0];
        // Determine GitHub link based on source file type
        if (source_file_names.includes(f_without_ext + '.qmd')) {
            source_file = source_path + f_without_ext + '.qmd';
        }
        else if (source_file_names.includes(f_without_ext + '.md')) {
            source_file = source_path + f_without_ext + '.md';
        }
        else if (source_file_names.includes(f_without_ext + '.ipynb')) {
            source_file = source_path + f_without_ext + '.ipynb';
        }
        else if (source_file_names.includes(f_without_ext + '.Rmd')) {
            source_file = source_path + f_without_ext + '.Rmd';
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
        let build_file_path = build_path + '/' + f.name;
        let file_bytes_in = Deno.readFileSync(build_file_path);
        let file_string_in = decoder.decode(file_bytes_in);
        let file_string_out = file_string_in.replace(string_to_replace, replacement_string);
        let file_bytes_out = encoder.encode(file_string_out);
        Deno.writeFileSync(build_file_path, file_bytes_out);
    }
}
