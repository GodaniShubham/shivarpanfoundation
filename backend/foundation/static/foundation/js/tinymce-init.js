(function () {
  function init() {
    if (!window.tinymce) return;
    window.tinymce.init({
      selector: "textarea.richtext",
      height: 420,
      menubar: true,
      plugins:
        "lists link image table code autoresize preview fullscreen searchreplace visualblocks wordcount",
      toolbar:
        "undo redo | blocks | bold italic underline | bullist numlist | link image table | removeformat | code preview fullscreen",
      branding: false,
      promotion: false,
      convert_urls: false,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

