import tkinter as tk
import time
import threading
import random
import sys

# === 人车模拟器 Demo ===
# 这是一个用于毕设演示的轻量级模拟器
# 功能：模拟车辆行驶、行人移动、雷达数据日志输出

class SimulatorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("HUTB 人车交互模拟器 (仿真验证中...)")
        self.root.geometry("600x400")
        
        # 创建画布
        self.canvas = tk.Canvas(root, bg="#333333", width=600, height=300)
        self.canvas.pack(pady=10)
        
        # 绘制道路
        self.canvas.create_rectangle(0, 100, 600, 200, fill="#555555", outline="")
        self.canvas.create_line(0, 150, 600, 150, fill="white", dash=(20, 10))
        
        # 创建车辆 (蓝色矩形)
        self.car = self.canvas.create_rectangle(50, 110, 100, 140, fill="#3498db")
        self.car_x = 50
        
        # 创建行人 (红色圆形)
        self.person = self.canvas.create_oval(400, 50, 420, 70, fill="#e74c3c")
        self.person_y = 50
        
        # 状态标签
        self.status_label = tk.Label(root, text="系统状态: 初始化完成", font=("Arial", 12))
        self.status_label.pack()

        # 启动模拟线程
        self.is_running = True
        self.thread = threading.Thread(target=self.simulation_loop)
        self.thread.daemon = True # 关闭窗口时杀掉线程
        self.thread.start()

    def simulation_loop(self):
        print("[System] 模拟器核心引擎启动...")
        print("[Lidar] 激光雷达连接成功 (Port: COM3)")
        
        while self.is_running:
            try:
                # 1. 模拟车辆移动
                if self.car_x < 550:
                    self.car_x += 2
                    self.canvas.move(self.car, 2, 0)
                else:
                    # 循环重置
                    self.canvas.move(self.car, -500, 0)
                    self.car_x = 50
                    print("[Event] 场景重置")

                # 2. 模拟行人横穿马路
                self.person_y += 1
                self.canvas.move(self.person, 0, 1)
                if self.person_y > 250:
                    self.canvas.move(self.person, 0, -200)
                    self.person_y = 50

                # 3. 模拟雷达检测逻辑
                dist = ((self.car_x - 400)**2 + (125 - self.person_y)**2)**0.5
                
                # 更新界面和日志
                if dist < 80:
                    log = f"[WARNING] 检测到行人! 距离: {dist:.1f}m - 触发紧急制动"
                    color = "red"
                    # 模拟减速
                    time.sleep(0.05) 
                else:
                    log = f"[INFO] 巡航模式 - 速度: 45km/h - 距离目标: {dist:.1f}m"
                    color = "green"
                    time.sleep(0.02)
                
                # 输出到终端 (这就很有极客范儿)
                print(log)
                
                # 更新UI文字 (在主线程)
                self.root.after(0, lambda: self.status_label.config(text=log, fg=color))
                
            except Exception as e:
                break

if __name__ == "__main__":
    root = tk.Tk()
    app = SimulatorApp(root)
    root.mainloop()
