# baza-contentmeter
Simple bar showing progress while reading a content. It supports whole pages and scrollable containers.

## Usage
### Add styles
`<link rel="stylesheet" type="text/css" href="dist/baza-contentmeter.css">`

### Add JS
Either
```
import ContentMeter from 'baza-contentmeter';
const myContentMeter = new ContentMeter("#content_meter", "#content_container", {
    invisibilityClass: false
});
```

or    
```
<script type="text/javascript" src="dist/baza-contentmeter.js"></script>
<script type="text/javascript">
    var myContentMeter = new ContentMeter(
        "#content_meter",
        "#content_container",
        {
            invisibilityClass: false
        }
    );
</script>
```
