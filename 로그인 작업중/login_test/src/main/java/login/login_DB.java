package login;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class login_DB {
	// 폼에서 보낸 값들을 받는다
		String url = "jdbc:oracle:thin:@localhost:1521:xe";
		String id = "system";
		String pw = "1234";
		
		// DB 연결용 변수
		Connection conn;
		PreparedStatement pstmt;
		ResultSet rs;
		
		//싱글톤
		private static login_DB instance;
		public login_DB() throws Exception {
			// 드라이버 로드
			Class.forName("oracle.jdbc.driver.OracleDriver");
			// DB 연결 >> 내 정보를 입력함
			conn = DriverManager.getConnection(url,id,pw);	
		}
		public static login_DB getInstance() throws Exception {
			
			if(instance ==null) {
				instance = new login_DB();
			}
			return instance;
		}
		
		
		public int insert(UserDto userdto) throws Exception {
			pstmt = conn.prepareStatement("insert into healthy_me values(?,?)");
			pstmt.setString(1, userdto.getId());
			pstmt.setString(2, userdto.getPw());
			int result = pstmt.executeUpdate();
			
			conn.close();
			pstmt.close();
			return result;
		}
		
		
}
