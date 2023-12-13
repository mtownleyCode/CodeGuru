exports.changecode =

  function test(content, language) {
    console.log('edit')
    var iFrame = document.getElementById('oc-editor'); // add an ID for the <iframe tag
    console.log(iFrame)
    iFrame.contentWindow.postMessage({
      eventType: 'populateCode',
      language: language.toLowerCase(),
      files: [
        {
          "name": "HelloWorld.html",
          "content": content,

        }
      ]
    }, "*")

    iFrame.contentWindow.postMessage({
      eventType: 'triggerRun'
    }, "*");

  };
