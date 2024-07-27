from pulp import LpMaximize, LpProblem, LpVariable

# Define the problem
model = LpProblem(name="water-distribution-optimization", sense=LpMaximize)

# Define variables
households = [f"household_{i}" for i in range(1, 11)]
water_allocation = {h: LpVariable(name=h, lowBound=0) for h in households}

# Objective function
model += sum(water_allocation.values()), "Total Water Allocation"

# Constraints
total_water_available = 1000  # Total water available for distribution
model += (sum(water_allocation.values()) <= total_water_available, "Water Constraint")

# Solve the problem
model.solve()

# Results
for h, var in water_allocation.items():
    print(f"{h}: {var.value()}")