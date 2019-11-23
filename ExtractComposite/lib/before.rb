class MakeCake
  def initialize
    @tasks = []
    @tasks << MakeBatter.new
    @tasks << FillPan.new
    @tasks << Bake.new
  end

  def calculate_duration
    dur = 0
    @tasks.each {|t| dur += t.duration}
    dur
  end
end

class MakeBatter
  def initialize
    add_sub_task(AddIngredients.new)
    add_sub_task(Mix.new)
  end

  def add_sub_task(task)
    @sub_tasks ||= []
    @sub_tasks << task
  end

  def duration
    @sub_tasks.map(&:minutes).reduce(:+)
  end
end

class AddIngredients
  def minutes
    1
  end
end

class Mix
  def minutes
    3
  end
end

class FillPan
  def duration
    2
  end
end

class Bake
  def duration
    40
  end
end
