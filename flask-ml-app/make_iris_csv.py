from sklearn import datasets

iris = datasets.load_iris(as_frame=True)
df = iris.frame
df.columns = ["sepal_length", "sepal_width", "petal_length", "petal_width", "species"]
df["species"] = df["species"].map(dict(enumerate(iris.target_names)))
df.to_csv("iris.csv", index=False)
