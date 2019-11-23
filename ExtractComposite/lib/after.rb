class Task
  def add_sub_task(task)
    @sub_tasks ||= []
    @sub_tasks << task
  end

  def time_required
    time = 0
    @sub_tasks.each {|t| time += t.time_required}
    time
  end
end

class MakeCake < Task
  def initialize
    add_sub_task(MakeBatter.new)
    add_sub_task(FillPan.new)
    add_sub_task(Bake.new)
  end
end

class MakeBatter < Task
  def initialize
    add_sub_task(AddIngredients.new)
    add_sub_task(Mix.new)
  end
end

class AddIngredients < Task
  def time_required
    1
  end
end

class Mix < Task
  def time_required
    3
  end
end

class FillPan < Task
  def time_required
    2
  end
end

class Bake < Task
  def time_required
    40
  end
end
