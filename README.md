# contentmeter [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
Simple bar showing progress while reading a content. It supports whole pages and scrollable containers.

[DEMO](https://bezet.github.io/contentmeter/)

## Installation

```bash
npm i @bezet/contentmeter
```


## Usage
### Add styles
`<link rel="stylesheet" type="text/css" href="dist/contentmeter.css">`

### Add JS
Either
```
import Contentmeter from '@bezet/contentmeter';
const myContentmeter = new Contentmeter({
  barSelector: '#content_meter',
  contentSelector: '#content_container',
});
```

or
```
<script type="text/javascript" src="dist/contentmeter.js"></script>
<script type="text/javascript">
  var myContentmeter = new Contentmeter({
    barSelector: '#content_meter',
    contentSelector: '#content_container',
  });
</script>
```

## License

MIT © [Bartek Zadara](github.com/bezet)


[npm-image]: https://badge.fury.io/js/%40bezet%2Fcontentmeter.svg
[npm-url]: https://npmjs.org/package/@bezet/contentmeter
[daviddm-image]: https://david-dm.org/bezet/contentmeter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/bezet/contentmeter
