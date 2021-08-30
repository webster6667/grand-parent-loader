<p align="center" style="text-align:center">
    <img src="./illustration.svg" alt="illustration" width="100"/>
</p>

# grand-parent-loader

> replace ^& to blockName

[![npm version](https://badge.fury.io/js/grand-parent-loader.svg)](https://www.npmjs.com/package/grand-parent-loader)

### Install

```shell
npm i grand-parent-loader
```

### Initialization

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'css-loader', 
                    'sass-loader', //or less-loader               
                	'grand-parent-loader'              
                ]
            },
        ]
    }
}
```

### Example

```scss
.select {
  border: 1px solid silver;

  &__item {
    width: 10px;
    background-color: white;
  }
  
  &_dark {
      border: 1px solid red;
      
      ^&__item {
          background-color: black;
      }
                
  }
  
}
```

^& - will be replaced to grand-parent blockName - .select

result will be

```scss
.select {
  border: 1px solid silver;

  &__item {
    width: 10px;
    background-color: white;
  }
  
  &_dark {
      border: 1px solid red;
      
      .select__item {
          background-color: black;
      }
                
  }
  
}
```

## Author

webster6667
