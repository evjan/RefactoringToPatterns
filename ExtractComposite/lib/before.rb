class MakeCake
  def initialize
    @tasks = []
    @tasks << MakeBatter.new
    @tasks << FillPan.new
    @tasks << Bake.new
  end

  def calculate_duration
    @tasks.reduce(&:duration)
  end
end

class MakeBatter
  def initialize
    add_sub_task(AddIngredients.new)
    add_sub_task(Mix.new)
  end

  def duration
    dur = 0
    sub_tasks.each {|st| dur += st.minutes}
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
