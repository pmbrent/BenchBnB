class BenchesController < ApplicationController

  def index
    @benches = Bench.in_bounds(params[:bounds])
    render json: @benches
  end

  def create
    @bench = Bench.new(bench_params)
    if @bench.save
      render json: @bench
    end
  end

private
  def bench_params
    params.require(:bench).permit(:lat, :lng, :description)
  end

end
