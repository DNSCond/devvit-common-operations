to make a pull request. (note step 7 and after is gemerated by chatgpt)

1. fork this repository.
2. create a new branch (should be `git branch <branch-name>` where <branch-name> is your file and function or class's name). or `git checkout -b <branch-name>` and skip step 3.
3. go to your edit field by `git checkout <branch-name>`, which should load your branch.
4. make your changes.
5. `git add .` to stage your changes, i think it means to make git recognize yoyr changes
6. commit your changes. `git commit -m "Add helpful feature description"` and put a helpful message in the quotes.
7. Go to your forked repository on GitHub.
8. You should see a “Compare & pull request” button near the top of your repository page. Click it.
9. Make sure the base repository is the original repository you forked from, and the base branch is usually main (or master, depending on the project). The compare branch should be your new branch.
10. Add a title and description for your pull request, explaining what changes you made and why.
11. Click “Create pull request”.

---

Optional but recommended:

- ~~Ensure your code follows the repository’s style and guidelines.~~
- ~~Check if tests need to be run or updated.~~
- Respond to feedback from maintainers if they request changes.
