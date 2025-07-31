# Separate ajax methods from jquery

Based on jquery.1.11.1min.js for separation, the volume is only 22kb.

# Requirement
     1. for normal Ajax request requirements
     2. Some apis cross domains and use JSONP for requests
     3. Third party APIs, clearly requiring the use of JSONP

# JSONP Principle

By changing all remote post or get requests to get requests, the so-called non cross domain request method is achieved. In fact, there is a layer of proxy mechanism in the intermediate code. Let's take a closer look at the code.
    
 Add a callBack method for callback, or leave it blank.

# Version

This is the 2018 version and no changes have been made so far. Change the $ in jquery to J$ to facilitate the complete introduction of jquery components into the project without occupying jquery $. This version will no longer be updated. The one who with requirements can disassemble other versions themselves, which usually takes 2-3 hours to complete.

# Example

    '<script type="text/javascript" version="1.11.1" src="jQuery.1.11.1.ajax.min.js"></script>'

window.J$.ajax({

      method: '',
      url: '',
      async:  false,
      headers: {},
      data: {},
      dataType: '',
      contentType: '',
      crossDomain: false,
      timeout: '',
      success: (res) => {},
      error: (err) => {}
})
