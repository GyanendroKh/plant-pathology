# Plant Pathology 2020 - FGVC7 (Kaggle Challenge)

Identify the category of follar diseases in apple trees.

[Kaggel Challenge](https://www.kaggle.com/c/plant-pathology-2020-fgvc7)


# Dataset

Download using [kaggle-api](https://github.com/Kaggle/kaggle-api) in the root project directory.
```console
foo@bar:~$ kaggle competitions download -c plant-pathology-2020-fgvc7
```

Unzip the dataset archive.
```console
foo@bar:~$ unzip plant-pathology-2020-fgvc7.zip -d data
```

Run the following script (`node` script) to structure the dataset.
```console
foo@bar:~$ node clean.js
```
