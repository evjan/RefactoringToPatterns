class BakeTask
  def add_sub_task(task)
    @sub_tasks ||= []
    @sub_tasks << task
  end

  def time_required
    @sub_tasks.map(&:time_required).reduce(:+)
  end
end

class MakeCake < BakeTask
  def initialize
    add_sub_task MakeBatter.new
    add_sub_task FillPan.new
    add_sub_task Bake.new
  end
end

class MakeBatter < BakeTask
  def initialize
    add_sub_task(AddIngredients.new)
    add_sub_task(Mix.new)
  end
end

class AddIngredients < BakeTask
  def time_required
    1
  end
end

class Mix < BakeTask
  def time_required
    3
  end
end

class FillPan < BakeTask
  def time_required
    2
  end
end

class Bake < BakeTask
  def time_required
    40
  end
end
