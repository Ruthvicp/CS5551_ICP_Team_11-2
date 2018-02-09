package tutorial.cs5551.com.translateapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class TranslateActivity extends AppCompatActivity {

    String API_URL = "https://api.fullcontact.com/v2/person.json?";
    String API_KEY = "b29103a702edd6a";
    String sourceText;
    TextView outputTextView;
    Context mContext;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_translate);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        /*String[] arraySpinner = new String[] {"English-en", "Spanish-es", "Italian-it", "Chinese-zh", "Telugu-te", "Hindi-hi"};*/
        String[] arraySpinner = new String[] {"English", "Spanish", "Italian", "Chinese", "Telugu", "Hindi"};
        Spinner s1 = (Spinner) findViewById(R.id.spinner2);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, arraySpinner);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        s1.setAdapter(adapter);

        Spinner s2 = (Spinner) findViewById(R.id.spinner3);
        ArrayAdapter<String> adapter1 = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, arraySpinner);
        adapter1.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        s2.setAdapter(adapter);
        outputTextView = (TextView) findViewById(R.id.txt_Result);

    }
    public void logout(View v) {
        Intent redirect = new Intent(TranslateActivity.this, LoginActivity.class);
        startActivity(redirect);
    }
    public void translateText(View v) {
        Map kv = new HashMap<String,String>();
        kv.put("English","en");kv.put("Spanish","es");
        kv.put("Italian","it");kv.put("Chinese","zh");
        kv.put("Telugu","te");kv.put("Hindi","hi");
        TextView sourceTextView = (TextView) findViewById(R.id.txt_Email);
        Spinner inputSpinner = (Spinner) findViewById(R.id.spinner2);
        Spinner outputSpinner = (Spinner) findViewById(R.id.spinner3);
        String inLang = inputSpinner.getSelectedItem().toString();
        /*inLang = inLang.substring(inLang.lastIndexOf("-")+1); */
        inLang = (String) kv.get(inLang);
        String outLang = outputSpinner.getSelectedItem().toString();
        outLang = (String) kv.get(outLang);
        /*outLang = outLang.substring(outLang.lastIndexOf("-")+1);*/

        sourceText = sourceTextView.getText().toString();
        String getURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?" +
                "key=trnsl.1.1.20151023T145251Z.bf1ca7097253ff7e." +
                "c0b0a88bea31ba51f72504cc0cc42cf891ed90d2&text=" + sourceText +"&" +
                "lang=" + inLang + "-" + outLang +"&[format=plain]&[options=1]&[callback=set]";//The API service URL
        final String response1 = "";
        OkHttpClient client = new OkHttpClient();
        try {
            Request request = new Request.Builder()
                    .url(getURL)
                    .build();
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println(e.getMessage());
                }
                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    final JSONObject jsonResult;
                    final String result = response.body().string();
                    try {
                        jsonResult = new JSONObject(result);
                        JSONArray convertedTextArray = jsonResult.getJSONArray("text");
                        final String convertedText = convertedTextArray.get(0).toString();
                        Log.d("okHttp", jsonResult.toString());
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                outputTextView.setText(convertedText);
                            }
                        });
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            });

        } catch (Exception ex) {
            outputTextView.setText(ex.getMessage());
        }
    }
}
