namespace ubiquitous.functions.tests.unit;

public class TestFunctionPool
{
    [Fact]
    public void ExecuteTypescriptFunctionFromPool()
    {
        var pool = new FunctionPool();
        pool.ExecuteFunction("a", "b");
    }
}
