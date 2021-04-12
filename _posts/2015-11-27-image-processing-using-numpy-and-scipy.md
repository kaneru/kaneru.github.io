---
layout: post
title:  "Image processing using NumPy and SciPy"
date:   2015-11-27 20:11:59
tags: python
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

<figure><img src="{{ site.url }}/assets/images/image-processing/japan.jpg" alt="Two images processed with my Python script. Left image is original. You can see japanese street on it. The right is the same image, but pixels are sorted by column."></figure>
<figure><img src="{{ site.url }}/assets/images/image-processing/grill.jpg" alt="Two images processed with my Python script. Left image is original. You can see anime girl on it. The right is the same image, but pixels are sorted by column."></figure>
<figure><img src="{{ site.url }}/assets/images/image-processing/lake.jpg" alt="Two images processed with my Pyhton script. Left image is original. You can see trees and lake in sunset on it. The right is the same image, but pixels are sorted by column."></figure>
