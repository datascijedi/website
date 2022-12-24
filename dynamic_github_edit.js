// This script inserts the page-specific GitHub edit link in the footer

// To Do: need to clean up code

// Prepare list of source files
var source_path = '.'
var source_files = Deno.readDirSync(source_path);
var source_files_array = Array.from(source_files);
var source_files_array_clean = Array();
for (const sf of source_files_array) {
    source_files_array_clean.push(sf.name);
}

// Prepare for string replacement
var string_to_replace = 'GH-6c622c2fa6a54817'
var dynamic_gh_html_pre = '<div>' + 
                    '<p><a href="'
var dynamic_gh_html_post = '"><div><i class="bi bi-github"></i></div>Edit this page</a></p>' +
                            '</div>'

// Find HTML build files and insert "Edit this page"
var build_path = './_site'
var build_files = Deno.readDirSync(build_path);
for (const f of build_files) {
    if (!f.isFile) continue;
    let f_split = f.name.split('.');
    let f_without_ext = f_split[0]
    let f_build_ext = f_split[1]
    if (f_build_ext.toLowerCase() != 'html') continue;
    const decoder = new TextDecoder("utf-8");
    const encoder = new TextEncoder("utf-8");

    if (source_files_array_clean.includes(f_without_ext + '.qmd')) {
        // to do: declare variables outside of if-block
        let source_file = source_path + f_without_ext + '.qmd';
        source_file = source_file.slice(1); // make this conditional upon a starting period? 
        let dynamic_gh_link = `https://github.com/datascijedi/website/edit/main/${source_file}`
        let replacement_string = dynamic_gh_html_pre + dynamic_gh_link + dynamic_gh_html_post

        // to do: abstract this to a function perhaps
        let build_file_path = build_path + '/' + f.name;
        let file_bytes = Deno.readFileSync(build_file_path);
        let file_string = decoder.decode(file_bytes)
        file_string = file_string.replace(string_to_replace, replacement_string);
        let file_bytes_out = encoder.encode(file_string);
        Deno.writeFileSync(build_file_path, file_bytes_out);
    }
    else if (source_files_array_clean.includes(f_without_ext + '.md')) {
        let source_file = source_path + f_without_ext + '.md';
        source_file = source_file.slice(1); // make this conditional upon a starting period? 
        let dynamic_gh_link = `https://github.com/datascijedi/website/edit/main/${source_file}`
        let replacement_string = dynamic_gh_html_pre + dynamic_gh_link + dynamic_gh_html_post

        // to do: abstract this to a function perhaps
        let build_file_path = build_path + '/' + f.name;
        let file_bytes = Deno.readFileSync(build_file_path);
        let file_string = decoder.decode(file_bytes)
        file_string = file_string.replace(string_to_replace, replacement_string);
        let file_bytes_out = encoder.encode(file_string);
        Deno.writeFileSync(build_file_path, file_bytes_out);
    }
    else {
        console.error(`No source file found for ${f}`)
    }
}
