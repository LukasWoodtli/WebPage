import matplotlib.pyplot as plt

plt.xkcd()


tasks = [15,15,14,12,11,8,4,2,1,0]
days = range(1, len(tasks)+1)


plt.plot(days, tasks, 'b-', days, tasks,  linewidth=4)
plt.ylabel('pending tasks')
plt.xlabel('day')
plt.grid(axis='x')

plt.show()
