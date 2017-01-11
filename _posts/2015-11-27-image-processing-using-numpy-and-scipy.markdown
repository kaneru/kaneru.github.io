---
layout: post
title:  "Image processing using NumPy and SciPy"
date:   2015-11-27 20:11:59 +0900
---
## script

little script written in python that sort an image array by column:

```python
image_processing.py
import numpy as np
import scipy.misc

image = "/Users/username/image.jpg"

image_array = scipy.misc.imread(image)
a = np.sort(image_array, axis=0)

scipy.misc.imsave('outimage.jpg', a)
```

## examples

![Imgur](http://i.imgur.com/GDBqohG.jpg)  ![Imgur](http://i.imgur.com/skAjTCZ.jpg)

![Imgur](http://i.imgur.com/jarv8RK.png)  ![Imgur](http://i.imgur.com/1cybeyK.jpg)

![Imgur](http://i.imgur.com/9qK0kru.jpg)  ![Imgur](http://i.imgur.com/3eZYg0i.jpg)


